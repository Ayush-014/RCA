import express from "express";
import { userMiddleware } from "../../middlewares/user.middleware.js";
import { asyncHandler } from "../../utils/AsyncHandler.js";
import { getMessagesController, getUsersForSidebarController, sendMessageController } from "../../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", userMiddleware, asyncHandler(getUsersForSidebarController));
messageRouter.get("/:id", userMiddleware, asyncHandler(getMessagesController));

messageRouter.post("/send/:id", userMiddleware, asyncHandler(sendMessageController));

export default messageRouter;