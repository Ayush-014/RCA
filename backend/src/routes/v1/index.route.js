import express from "express";
import { authRouter } from "./auth.route.js";

export const router = express.Router();
// console.log("auth ROUTE HIT");
router.use("/auth", authRouter);
