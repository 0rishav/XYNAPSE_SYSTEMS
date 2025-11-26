import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createInternshipApplication,
  deleteInternshipApplication,
  getAllInternshipApplications,
  getSingleInternshipApplication,
  hardDeleteInternshipApplication,
  toggleInternshipApplicationActive,
  updateInternshipApplicationStatus,
} from "../controllers/internship.js";
import { multerMiddleware } from "../utils/multerConfig.js";

const internshipRouter = express.Router();

internshipRouter.post(
  "/create",
  multerMiddleware([{ name: "resumeUrl", maxCount: 1 }]),
  createInternshipApplication
);

internshipRouter.get("/all", isAuthenticated, getAllInternshipApplications);

internshipRouter.post("/:id", isAuthenticated, getSingleInternshipApplication);

internshipRouter.patch(
  "/status/:id",
  isAuthenticated,
  updateInternshipApplicationStatus
);

internshipRouter.patch(
  "/soft-delete/:id",
  isAuthenticated,
  deleteInternshipApplication
);

internshipRouter.delete(
  "/hard-delete/:id",
  isAuthenticated,
  hardDeleteInternshipApplication
);

internshipRouter.patch(
  "/toggle/:id",
  isAuthenticated,
  toggleInternshipApplicationActive
);

export default internshipRouter;
