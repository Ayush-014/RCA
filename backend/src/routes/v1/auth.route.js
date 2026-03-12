import { Router } from "express";
import { logoutController, signinController, signupController } from "../../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.get("/signup", signupController);
authRouter.get("/signin", signinController);
authRouter.get("/logout", logoutController);