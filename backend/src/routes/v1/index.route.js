import express from "express";
import { authRouter } from "./auth.route.js";

export const router = express.Router();

router.use("/auth", authRouter);
