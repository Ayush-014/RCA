import { Router } from "express";
import { logoutController, signinController, signupController } from "../../controllers/auth.controller.js";

export const authRouter = Router();
// console.log("auth router ROUTE HIT");
authRouter.get("/signup", signupController);
authRouter.get("/signin", signinController);
authRouter.get("/logout", logoutController);