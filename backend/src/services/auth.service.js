import User from "../models/user.model.js"
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/jwtHelper.js"

export const signupUser = async (fullName, password, email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new AppError("email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    });

    if (newUser) {
        await newUser.save();
        return newUser;

    } else {
        throw new AppError("signup new user creation failed", 400);
    }
}