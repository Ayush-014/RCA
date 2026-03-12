import User from "../models/user.model.js"
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs"

export const signupUser = async (fullName, password, email) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new AppError("email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
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
};

export const signinUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid credentials", 400);
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new AppError("Invalid credentials", 400);
    }

    return user;
};

export const updateProfile = async (userId, url) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: url },
        { new: true }
    );
    
    if(!updatedUser) {
        throw new AppError("error while updating", 400);
    }

    return updatedUser;
}