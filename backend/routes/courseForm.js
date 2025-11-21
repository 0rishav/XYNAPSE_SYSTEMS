import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteCourseForm,
  getAllCourseForms,
  getFormsByCourseId,
  getRecentCourseForms,
  getSingleCourseForm,
  searchCourseForms,
  submitCourseForm,
  updateCourseForm,
} from "../controllers/courseForm.js";

const courseFormRouter = express.Router();

courseFormRouter.post("/create-form", isAuthenticated, submitCourseForm);

courseFormRouter.get("/all-form", isAuthenticated, getAllCourseForms);

courseFormRouter.get("/search-form", isAuthenticated, searchCourseForms);

courseFormRouter.get("/recent-form", isAuthenticated, getRecentCourseForms);

courseFormRouter.patch("/update-form/:id", isAuthenticated, updateCourseForm);

courseFormRouter.get("/form/:id", isAuthenticated, getSingleCourseForm);

courseFormRouter.patch("/delete/:id", isAuthenticated, deleteCourseForm);

courseFormRouter.get("/course/:courseId", isAuthenticated, getFormsByCourseId);

export default courseFormRouter;
