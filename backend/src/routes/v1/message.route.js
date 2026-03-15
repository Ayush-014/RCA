import express from "express";
import { protectedRoute } from "../../middlewares/protect.middleware.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { getMessagesController, getUsersForSidebarController, sendMessageController } from "../../controllers/message.controller.js";

export const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, asyncHandler(getUsersForSidebarController));
messageRouter.get("/:id", protectedRoute, asyncHandler(getMessagesController));

messageRouter.post("/send/:id", protectedRoute, asyncHandler(sendMessageController));