import User from "../models/user.model"
import AppError from "../utils/AppError";
import bcrypt from "bcryptjs"

export const signup = async (username,password,email) => {
    const user = await User.findOne({email});
    if(user) {
        throw new AppError("email already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    const newUser = await new User({
        fullName,
        email,
        password: hashedPassword
    });

    
}