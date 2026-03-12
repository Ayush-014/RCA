import { Router } from "express";
import { checkAuthController, logoutController, signinController, signupController, updateProfileController } from "../../controllers/auth.controller.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { userMiddleware } from "../../middlewares/user.middleware.js";

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signupController));
authRouter.post("/signin", asyncHandler(signinController));
authRouter.post("/logout", asyncHandler(logoutController));

authRouter.put("/update-profile", userMiddleware, asyncHandler(updateProfileController));
authRouter.get("/check", userMiddleware, asyncHandler(checkAuthController));