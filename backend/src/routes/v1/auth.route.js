import { Router } from "express";
import { logoutController, signinController, signupController } from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signupController));
authRouter.get("/signin", asyncHandler(signinController));
authRouter.get("/logout", asyncHandler(logoutController));