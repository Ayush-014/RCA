import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { getMessages, getUsers, sendMessage } from "../services/message.service.js";
import { chatParamsSchema, messageBodySchema, messageParamsSchema } from "../types/index.type.js";

export const getUsersForSidebarController = async (req, res) => {
    const loggedInUserId = req.user._id;
    const filteredUsers = await getUsers(loggedInUserId);

    res.status(200).json(filteredUsers);
};

export const getMessagesController = async (req, res) => {
    const { id: userToChatId } = chatParamsSchema.parse(req.params);
    const myId = req.user._id;

    const messages = await getMessages(myId, userToChatId);

    res.status(200).json(messages);
};

export const sendMessageController = async (req, res) => {
    const { id: receiverId } = messageParamsSchema.parse(req.params);
    const { image, text } = messageBodySchema.parse(req.body);
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
        // upload base64 image
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await sendMessage(senderId, receiverId, text, imageUrl);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
};