import { isObjectIdOrHexString } from "mongoose";
import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import CourseForm from "../models/course/courseFormModal.js";
import ApiFeatures from "../services/apiService.js";

export const submitCourseForm = CatchAsyncError(async (req, res, next) => {
  const { name, email, mobile, city, courseId } = req.body;

  if (!name) {
    return next(new ErrorHandler("Name field is required.", 400));
  }

  if (!email) {
    return next(new ErrorHandler("Email field is required.", 400));
  }

  if (!mobile) {
    return next(new ErrorHandler("Mobile number is required.", 400));
  }

  if (!courseId) {
    return next(
      new ErrorHandler("Course ID is required to submit the form.", 400)
    );
  }

  if (!isObjectIdOrHexString(courseId)) {
    return next(
      new ErrorHandler(
        "Invalid Course ID format. Please check the provided ID.",
        400
      )
    );
  }

  const existingForm = await CourseForm.findOne({
    email,
    courseId,
    isDeleted: false,
  });

  if (existingForm) {
    if (existingForm.status !== "rejected") {
      return next(
        new ErrorHandler(
          `You have already applied for this course. Your current status is: ${existingForm.status}.`,
          409
        )
      ); // 409 Conflict
    }
    return next(
      new ErrorHandler(
        "A form for this course with this email already exists.",
        409
      )
    );
  }

  const newForm = await CourseForm.create({
    name,
    email,
    mobile,
    city,
    courseId,
  });

  res.status(201).json({
    success: true,
    message: "Course form submitted successfully! Status: Pending.",
    data: newForm,
  });
});

export const getAllCourseForms = CatchAsyncError(async (req, res, next) => {
  const countFeatures = new ApiFeatures(CourseForm.find(), req.query)
    .search()
    .filter();
  const totalCount = await countFeatures.query.countDocuments();

  const features = new ApiFeatures(
    CourseForm.find().populate("courseId", "title price"),
    req.query
  )
    .search()
    .filter()
    .sort()
    .paginate();

  const forms = await features.query;

  const resultPerPage = Number(req.query.limit) || 10;
  const currentPage = Number(req.query.page) || 1;
  const totalPages = Math.ceil(totalCount / resultPerPage);

  res.status(200).json({
    success: true,
    count: forms.length,
    totalCount,
    currentPage,
    totalPages,
    message: "Course forms fetched successfully.",
    data: forms,
  });
});

export const getSingleCourseForm = CatchAsyncError(async (req, res, next) => {
  const formId = req.params.id;

  if (!isObjectIdOrHexString(formId)) {
    return next(new ErrorHandler("Invalid Form ID format.", 400));
  }

  const form = await CourseForm.findById(formId).populate(
    "courseId",
    "title price"
  );

  if (!form) {
    return next(
      new ErrorHandler(`Course Form not found with ID: ${formId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Course form fetched successfully.",
    data: form,
  });
});

export const updateCourseForm = CatchAsyncError(async (req, res, next) => {
  const formId = req.params.id;
  const { status, adminNotes } = req.body;

  if (!isObjectIdOrHexString(formId)) {
    return next(new ErrorHandler("Invalid Form ID format.", 400));
  }

  const updateData = {};
  const validStatuses = ["pending", "processed", "rejected"];

  if (status) {
    if (!validStatuses.includes(status)) {
      return next(
        new ErrorHandler(
          `Invalid status value: ${status}. Must be one of: ${validStatuses.join(
            ", "
          )}`,
          400
        )
      );
    }
    updateData.status = status;
  }

  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }

  if (Object.keys(updateData).length === 0) {
    return next(
      new ErrorHandler(
        "No valid update fields (status or adminNotes) provided.",
        400
      )
    );
  }

  const updatedForm = await CourseForm.findByIdAndUpdate(formId, updateData, {
    new: true,
    runValidators: true,
  }).populate("courseId", "title price");

  if (!updatedForm) {
    return next(
      new ErrorHandler(`Course Form not found with ID: ${formId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Course form updated successfully.",
    data: updatedForm,
  });
});

export const deleteCourseForm = CatchAsyncError(async (req, res, next) => {
  const formId = req.params.id;

  if (!isObjectIdOrHexString(formId)) {
    return next(new ErrorHandler("Invalid Form ID format.", 400));
  }
  const deletedForm = await CourseForm.findByIdAndUpdate(
    formId,
    { isDeleted: true },
    { new: true }
  );

  if (!deletedForm) {
    return next(
      new ErrorHandler(`Course Form not found with ID: ${formId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "Course form successfully soft-deleted.",
    data: { _id: deletedForm._id, isDeleted: deletedForm.isDeleted },
  });
});

export const getFormsByCourseId = CatchAsyncError(async (req, res, next) => {
  const courseId = req.params.courseId;

  if (!isObjectIdOrHexString(courseId)) {
    return next(new ErrorHandler("Invalid Course ID format.", 400));
  }

  let baseQuery = CourseForm.find({ courseId: courseId });

  const countFeatures = new ApiFeatures(baseQuery.clone(), req.query)
    .search()
    .filter();
  const totalCount = await countFeatures.query.countDocuments();

  const features = new ApiFeatures(
    baseQuery.populate("courseId", "title price"),
    req.query
  )
    .search()
    .filter()
    .sort()
    .paginate();

  const forms = await features.query;

  const resultPerPage = Number(req.query.limit) || 10;
  const currentPage = Number(req.query.page) || 1;
  const totalPages = Math.ceil(totalCount / resultPerPage);

  res.status(200).json({
    success: true,
    count: forms.length,
    totalCount,
    currentPage,
    totalPages,
    message: `Course forms fetched successfully for course ID: ${courseId}.`,
    data: forms,
  });
});

export const searchCourseForms = CatchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword;

  if (!keyword || keyword.trim() === "") {
    return next(
      new ErrorHandler(
        "Search keyword (name, email, mobile, or city) is required in query parameters.",
        400
      )
    );
  }

  const countFeatures = new ApiFeatures(CourseForm.find(), req.query)
    .search()
    .filter();
  const totalCount = await countFeatures.query.countDocuments();

  const features = new ApiFeatures(
    CourseForm.find().populate("courseId", "title price"),
    req.query
  )
    .search()
    .filter()
    .sort()
    .paginate();

  const forms = await features.query;

  const resultPerPage = Number(req.query.limit) || 10;
  const currentPage = Number(req.query.page) || 1;
  const totalPages = Math.ceil(totalCount / resultPerPage);

  res.status(200).json({
    success: true,
    count: forms.length,
    totalCount,
    currentPage,
    totalPages,
    message: `Search results for keyword '${keyword}' fetched successfully.`,
    data: forms,
  });
});

export const getRecentCourseForms = CatchAsyncError(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;

  const recentForms = await CourseForm.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate({
      path: "courseId",
      select: "title fees -_id",
    });

  const totalCount = await CourseForm.countDocuments({});

  if (recentForms.length === 0 && page === 1) {
    return res.status(200).json({
      success: true,
      message: "No course forms submitted yet.",
      data: [],
      meta: { totalCount: 0, currentPage: 0, totalPages: 0 },
    });
  }

  res.status(200).json({
    success: true,
    data: recentForms,
    meta: {
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      limit: limit,
    },
  });
});
