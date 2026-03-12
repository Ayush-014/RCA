import { signinUser, signupUser, updateProfile } from "../services/auth.service.js";
import { signinSchema, signupSchema, updateProfileSchema } from "../types/index.type.js";
import AppError from "../utils/AppError.js";
import { generateToken } from '../utils/jwt.js';
import cloudinary from "../lib/cloudinary.js";

export const signupController = async (req, res) => {
    // const { fullName, email, password } = req.body;
    const parsedData = signupSchema.safeParse(req.body);
    // console.log(req.body);
    if (!parsedData) {
        throw new AppError("Invalid Credentials", 400);
    }
    // console.log(parsedData);
    const user = await signupUser(parsedData.data.fullName, parsedData.data.password, parsedData.data.email);
    generateToken(user._id, res);

    const { password, ...userData } = user._doc;
    res.status(201).json({
        success: true,
        message: "signup successfull",
        user: userData
    })
};

export const signinController = async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData) {
        throw new AppError("Invalid Credentials", 400);
    }

    const user = await signinUser(parsedData.data.password, parsedData.data.email);
    generateToken(user._id, res);

    const { password, ...userData } = user._doc;
    res.status(201).json({
        success: true,
        message: "signup successfull",
        user: userData
    });
};

export const logoutController = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged-out successfully" });
    } catch (error) {
        console.log("error while logout", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfileController = async (req, res) => {
    const parsedData = updateProfileSchema.safeParse(req.body);
    if (!parsedData) {
        throw new AppError("Invalid Credentials", 400);
    }

    try {
        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(parsedData.data.profilePic);
        const updatedUser = await updateProfile(userId, uploadResponse.secure_url);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error while updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuthController = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};