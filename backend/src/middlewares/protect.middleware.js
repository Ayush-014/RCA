import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};