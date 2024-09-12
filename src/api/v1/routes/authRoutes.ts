import { Router } from "express";
import { AuthController } from "../../../controllers/authController";
import asyncErrorHandler from "../../../utils/errorHandler";
const { login, register, logout } = new AuthController();

const router = Router();

router.post("/register", asyncErrorHandler(register));
router.post("/login", asyncErrorHandler(login));
router.post("/logout", asyncErrorHandler(logout));

export default router;
