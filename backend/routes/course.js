import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  moderateCourse,
  toggleFeatureCourse,
  togglePublishCourse,
  updateCourse,
  updateCourseSEO,
  uploadCourseThumbnail,
} from "../controllers/course.js";
import { multerMiddleware } from "../utils/multerConfig.js";

const courseRouter = express.Router();

courseRouter.post(
  "/create",
  isAuthenticated,
  multerMiddleware([
    { name: "thumbnail", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  createCourse
);

courseRouter.get("/all-courses", getAllCourses);

courseRouter.put(
  "/:id",
  isAuthenticated,
  multerMiddleware([
    { name: "thumbnail", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  updateCourse
);

courseRouter.get("/:id", getCourseById);

courseRouter.patch("/delete/:id", isAuthenticated, deleteCourse);

courseRouter.patch("/publish/:id", isAuthenticated, togglePublishCourse);

courseRouter.patch("/feature/:id", isAuthenticated, toggleFeatureCourse);

courseRouter.patch("/moderate/:id", isAuthenticated, moderateCourse);

courseRouter.patch(
  "/thumbnail/:id",
  isAuthenticated,
  multerMiddleware([
    { name: "thumbnail", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  uploadCourseThumbnail
);

courseRouter.patch("/seo/:id", isAuthenticated, updateCourseSEO);

export default courseRouter;
