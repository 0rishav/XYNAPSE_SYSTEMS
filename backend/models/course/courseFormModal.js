import mongoose from "mongoose";

const courseFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    mobile: { type: String, required: true, trim: true, maxlength: 15 },
    city: { type: String, trim: true, maxlength: 100 },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processed", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String, trim: true },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: "version" }
);

courseFormSchema.pre(/^find/, function (next) {
  if (!this.getQuery().hasOwnProperty("isDeleted"))
    this.where({ isDeleted: false });
  next();
});

const CourseForm = mongoose.model("CourseForm", courseFormSchema);
export default CourseForm;
