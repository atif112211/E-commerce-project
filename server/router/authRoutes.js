import express from "express";
import { register, login, logout, getUser, forgotPassword } from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticatedUser, logout);
router.get("/me",isAuthenticatedUser,  getUser)
router.post("/password/forgot", forgotPassword)

export default router