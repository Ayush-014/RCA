import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new AppError("unauthorized: no token provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new AppError("unauthorized: invalid token provided", 401);
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      throw new AppError("User Not found", 404);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in user middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
