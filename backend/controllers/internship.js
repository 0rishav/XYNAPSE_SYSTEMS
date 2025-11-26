import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import InternshipApplication from "../models/Internship/internshipModal.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import dotenv from "dotenv";
import { sendMail } from "../utils/sendMail.js";

dotenv.config();

export const createInternshipApplication = CatchAsyncError(
  async (req, res, next) => {
    const {
      name,
      email,
      phone,
      courseId,
      year,
      department,
      linkedin,
      portfolio,
    } = req.body;

    let resumeData = {};
    let application;

    try {
      if (!name) return next(new ErrorHandler("Name is required", 400));
      if (!email) return next(new ErrorHandler("Email is required", 400));
      if (!phone)
        return next(new ErrorHandler("Phone number is required", 400));
      if (!courseId)
        return next(new ErrorHandler("Course ID is required", 400));
      if (!year) return next(new ErrorHandler("Year is required", 400));
      if (!department)
        return next(new ErrorHandler("Department is required", 400));

      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return next(new ErrorHandler("Invalid email format", 400));
      }

      if (phone && !/^\d{7,15}$/.test(phone.replace(/[\s\-]/g, ""))) {
        return next(new ErrorHandler("Invalid phone number", 400));
      }

      const resumeFile = req.files?.resumeUrl?.[0];
      if (resumeFile) {
        const result = await cloudinary.uploader.upload(resumeFile.path, {
          folder: "internships/resumes",
          resource_type: "auto",
        });
        resumeData = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }

      application = await InternshipApplication.create({
        name,
        email,
        phone,
        resumeUrl: resumeData,
        courseId,
        year,
        department,
        linkedin,
        portfolio,
      });

      res.status(201).json({
        success: true,
        message: "Internship Application Submitted !!",
        application,
      });
    } catch (error) {
      return next(error);
    } finally {
      const resumeFile = req.files?.resumeUrl?.[0];
      if (resumeFile && fs.existsSync(resumeFile.path)) {
        fs.unlinkSync(resumeFile.path);
      }

      if (application) {
        try {
          await sendMail({
            email: process.env.ADMIN_MAIL,
            subject: "New Internship Application Received",
            template: "internship-mail.ejs",
            data: { application },
          });
          console.log("Admin notified via email");
        } catch (mailError) {
          console.error("Error sending admin notification:", mailError);
        }
      }
    }
  }
);

export const getAllInternshipApplications = CatchAsyncError(
  async (req, res, next) => {
    let {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      courseId,
      department,
      year,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (courseId) filter.courseId = courseId;
    if (department) filter.department = department;
    if (year) filter.year = year;

    const sortOrder = order.toLowerCase() === "asc" ? 1 : -1;

    const totalApplications = await InternshipApplication.countDocuments(
      filter
    );

    const applications = await InternshipApplication.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("courseId", "name");

    res.status(200).json({
      success: true,
      totalApplications,
      page,
      totalPages: Math.ceil(totalApplications / limit),
      applications,
    });
  }
);

export const getSingleInternshipApplication = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorHandler("Invalid Application ID", 400));
    }

    const application = await InternshipApplication.findById(id).populate(
      "courseId",
      "name"
    );

    if (!application) {
      return next(new ErrorHandler("Internship application not found", 404));
    }

    res.status(200).json({
      success: true,
      application,
    });
  }
);

export const updateInternshipApplicationStatus = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorHandler("Invalid Application ID", 400));
    }

    const allowedStatuses = ["pending", "reviewed", "selected", "rejected"];
    if (!status || !allowedStatuses.includes(status.toLowerCase())) {
      return next(
        new ErrorHandler(
          `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
          400
        )
      );
    }

    const application = await InternshipApplication.findById(id);
    if (!application) {
      return next(new ErrorHandler("Internship application not found", 404));
    }

    application.status = status.toLowerCase();
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application status updated to '${status}'`,
      application,
    });
  }
);

export const deleteInternshipApplication = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorHandler("Invalid Application ID", 400));
    }

    const application = await InternshipApplication.findById(id);
    if (!application) {
      return next(new ErrorHandler("Internship application not found", 404));
    }

    application.isDeleted = true;
    application.deletedAt = new Date();
    await application.save();

    if (application.resumeUrl && application.resumeUrl.public_id) {
      await cloudinary.uploader.destroy(application.resumeUrl.public_id, {
        resource_type: "raw",
      });
    }

    res.status(200).json({
      success: true,
      message: "Internship application soft-deleted successfully",
    });
  }
);

export const toggleInternshipApplicationActive = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorHandler("Invalid Application ID", 400));
    }

    if (typeof isActive !== "boolean") {
      return next(new ErrorHandler("isActive must be boolean", 400));
    }

    const application = await InternshipApplication.findById(id);
    if (!application) {
      return next(new ErrorHandler("Internship application not found", 404));
    }

    application.isActive = isActive;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Internship application ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      application,
    });
  }
);

export const hardDeleteInternshipApplication = CatchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new ErrorHandler("Invalid Application ID", 400));
    }

    const application = await InternshipApplication.findById(id);
    if (!application) {
      return next(new ErrorHandler("Internship application not found", 404));
    }

    if (application.resumeUrl?.public_id) {
      try {
        await cloudinary.uploader.destroy(application.resumeUrl.public_id, {
          resource_type: "auto",
        });
      } catch (err) {
        console.error("Failed to delete resume from Cloudinary:", err);
      }
    }

    await InternshipApplication.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Internship application permanently deleted",
    });
  }
);
