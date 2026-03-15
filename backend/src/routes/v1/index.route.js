import express from "express";
import { authRouter } from "./auth.route.js";
import { messageRouter } from "./message.route.js";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/message", messageRouter);