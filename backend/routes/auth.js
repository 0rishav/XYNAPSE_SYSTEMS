import express from "express";
import {
  activateUser,
  changePassword,
  getMe,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resetPassword,
  sendForgotPasswordOtp,
  sendVerificationRequest,
  updateProfile,
  verifyForgotPasswordOtp,
  verifyUserAccount,
} from "../controllers/auth.js";
import { isAuthenticated, requireRole } from "../middlewares/auth.js";
import { multerMiddleware } from "../utils/multerConfig.js";

const authRouter = express.Router();

// regarding signup
authRouter.post("/register", registerUser);

authRouter.post("/activate-user", activateUser);

// regarding login, logout and refresh
authRouter.post("/login", loginUser);

authRouter.post("/logout", isAuthenticated, logoutUser);

authRouter.post("/refresh", isAuthenticated, refreshToken);

// regarding forgot password
authRouter.post("/forgot/send", sendForgotPasswordOtp);

authRouter.post("/forgot/verify", verifyForgotPasswordOtp);

authRouter.post("/password/reset", resetPassword);

// regarding profile
authRouter.get("/me", isAuthenticated, getMe);

authRouter.patch("/change-password", isAuthenticated, changePassword);

authRouter.patch(
  "/update-profile",
  isAuthenticated,
  multerMiddleware([{ name: "avatar", maxCount: 1 }]),
  updateProfile
);

// ADMIN ROUTES

// regarding instructor/admin verification

authRouter.post("/send-verification", isAuthenticated, sendVerificationRequest);

authRouter.patch(
  "/accept-verification/:userId",
  isAuthenticated,
  requireRole("admin"),
  verifyUserAccount
);

export default authRouter;
