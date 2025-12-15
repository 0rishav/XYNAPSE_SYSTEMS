import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import Auth from "../models/auth/authModal.js";
import Invoice from "../models/invoices/invoiceModal.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendMail } from "../utils/sendMail.js";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import puppeteer from "puppeteer";
import mongoose from "mongoose";
import CourseForm from "../models/course/courseFormModal.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createInvoice = CatchAsyncError(async (req, res, next) => {
  const {
    studentId,
    courseId,
    instructorId,
    paymentMode,
    courseFee,
    discount,
    taxes,
    notes,
  } = req.body;

  if (!studentId) return next(new ErrorHandler("Student ID is required", 400));
  if (!courseId) return next(new ErrorHandler("Course ID is required", 400));
  if (!instructorId)
    return next(new ErrorHandler("Instructor ID is required", 400));
  if (!paymentMode)
    return next(new ErrorHandler("Payment Mode is required", 400));
  if (!courseFee) return next(new ErrorHandler("Course Fee is required", 400));

  const student = await Auth.findById(studentId);
  if (!student) return next(new ErrorHandler("Student not found", 404));

  const courseForm = await CourseForm.findOne({
    studentId,
    courseId,
    isDeleted: false,
  });

  if (!courseForm) {
    return next(
      new ErrorHandler(
        "Course form not found for this student and course",
        404
      )
    );
  }

  if (courseForm.status !== "paid") {
    return next(
      new ErrorHandler(
        `Invoice cannot be created. Status is not Paid`,
        400
      )
    );
  }

  const invoice = await Invoice.create({
    studentId,
    courseId,
    instructorId,
    paymentMode,
    courseFee: mongoose.Types.Decimal128.fromString(courseFee.toString()),
    discount: mongoose.Types.Decimal128.fromString((discount || 0).toString()),
    taxes: {
      cgst: mongoose.Types.Decimal128.fromString((taxes?.cgst || 0).toString()),
      sgst: mongoose.Types.Decimal128.fromString((taxes?.sgst || 0).toString()),
      igst: mongoose.Types.Decimal128.fromString((taxes?.igst || 0).toString()),
      otherTaxes: mongoose.Types.Decimal128.fromString(
        (taxes?.otherTaxes || 0).toString()
      ),
    },
    notes: notes || "",
    createdBy: req.user._id,
  });

  await sendMail({
    email: student.email,
    subject: `Invoice Created: ${invoice.invoiceNumber}`,
    template: "invoiceEmail.ejs",
    data: { invoice, student },
  });

  res.status(201).json({
    success: true,
    message: "Invoice created successfully",
    invoice,
  });
});

export const getAllInvoices = CatchAsyncError(async (req, res, next) => {
  const {
    studentId,
    courseId,
    paymentStatus,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = { isDeleted: false };

  if (studentId) filter.studentId = studentId;
  if (courseId) filter.courseId = courseId;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const invoices = await Invoice.find(filter)
    .populate("studentId", "name email")
    .populate("instructorId", "name email")
    .populate("courseId", "title")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Invoice.countDocuments(filter);

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    invoices,
  });
});

export const getSingleInvoice = CatchAsyncError(async (req, res, next) => {
  const { invoiceId } = req.params;

  const invoice = await Invoice.findById(invoiceId)
    .populate("studentId", "name email")
    .populate("instructorId", "name email")
    .populate("courseId", "name");

  if (!invoice || invoice.isDeleted) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  res.status(200).json({
    success: true,
    invoice,
  });
});

export const getMyInvoices = CatchAsyncError(async (req, res, next) => {
  const authId = req.user._id;

  const invoices = await Invoice.find({
    isDeleted: false,
    $or: [
      { studentId: authId },
      { instructorId: authId },
    ],
  })
    .populate("studentId", "name email")
    .populate("courseId", "title")
    .populate("instructorId", "name email")
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    success: true,
    message: "Invoices fetched successfully",
    total: invoices.length,
    data: invoices,
  });
});

export const updateInvoice = CatchAsyncError(async (req, res, next) => {
  const { invoiceId } = req.params;
  const updateData = req.body;

  const invoice = await Invoice.findById(invoiceId);
  if (!invoice || invoice.isDeleted) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  if (invoice.paymentStatus === "paid") {
    const restrictedFields = ["courseFee", "discount", "taxes", "totalAmount"];
    for (let field of restrictedFields) {
      if (field in updateData) {
        return next(
          new ErrorHandler(`Cannot update ${field} for a paid invoice`, 400)
        );
      }
    }
  }

  Object.keys(updateData).forEach((key) => {
    invoice[key] = updateData[key];
  });

  await invoice.save();

  res.status(200).json({
    success: true,
    message: "Invoice updated successfully",
    invoice,
  });
});

export const deleteInvoice = CatchAsyncError(async (req, res, next) => {
  const { invoiceId } = req.params;

  const invoice = await Invoice.findById(invoiceId);
  if (!invoice || invoice.isDeleted) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  if (invoice.paymentStatus === "paid") {
    return next(new ErrorHandler("Cannot delete a paid invoice", 400));
  }

  invoice.isDeleted = true;
  invoice.deletedAt = new Date();

  await invoice.save();

  res.status(200).json({
    success: true,
    message: "Invoice soft-deleted successfully",
  });
});

export const updatePaymentStatus = CatchAsyncError(async (req, res, next) => {
  const { invoiceId } = req.params;
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    return next(new ErrorHandler("Payment status is required", 400));
  }

  const validStatuses = ["pending", "paid", "cancelled"];
  if (!validStatuses.includes(paymentStatus)) {
    return next(
      new ErrorHandler(
        `Payment status must be one of: ${validStatuses.join(", ")}`,
        400
      )
    );
  }

  const invoice = await Invoice.findById(invoiceId);
  if (!invoice || invoice.isDeleted) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  invoice.paymentStatus = paymentStatus;
  await invoice.save();

  res.status(200).json({
    success: true,
    message: `Payment status updated to ${paymentStatus}`,
    invoice,
  });
});

export const searchInvoices = CatchAsyncError(async (req, res, next) => {
  const {
    studentName,
    courseName,
    invoiceNumber,
    paymentStatus,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = { isDeleted: false };

  if (studentName) filter.studentName = { $regex: studentName, $options: "i" };
  if (courseName) filter.courseName = { $regex: courseName, $options: "i" };
  if (invoiceNumber) filter.invoiceNumber = invoiceNumber;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const invoices = await Invoice.find(filter)
    .populate("studentId", "name email")
    .populate("instructorId", "name email")
    .populate("courseId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Invoice.countDocuments(filter);

  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    invoices,
  });
});

export const downloadInvoicePDF = CatchAsyncError(async (req, res, next) => {
  const { invoiceId } = req.params;

  if (!invoiceId.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new ErrorHandler("Invalid Invoice ID", 400));
  }

  const invoice = await Invoice.findById(invoiceId)
    .populate("studentId", "name email")
    .populate("instructorId", "name email")
    .populate("courseId", "title");

  if (!invoice || invoice.isDeleted) {
    return next(new ErrorHandler("Invoice not found", 404));
  }

  const templatePath = path.join(__dirname, "../mails/invoiceEmail.ejs");

  const html = await ejs.renderFile(templatePath, {
    invoice,
    student: invoice.studentId,
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=invoice_${invoice.invoiceNumber}.pdf`,
    "Content-Length": pdfBuffer.length,
  });

  res.send(pdfBuffer);
});
