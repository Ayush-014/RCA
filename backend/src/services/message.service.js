import Message from "../models/message.model.js";
import User from "../models/user.model.js"
import AppError from "../utils/AppError.js";

export const getUsers = async (userId) => {
    const users = await User.find({
        _id: {
            $ne: userId
        }
    }).select("-password");

    return users;
};

export const getMessages = async (myId, userToChatId) => {
    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ],
    });

    return messages;
};

export const sendMessage = async (senderId, receiverId, text, imageUrl) => {
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });
    await newMessage.save();

    return newMessage;
}