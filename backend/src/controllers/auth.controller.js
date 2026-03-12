import { signupUser } from "../services/auth.service.js";
import { signupSchema } from "../types/index.type.js";
import AppError from "../utils/AppError.js";

export const signupController = async (req, res) => {
    // const { fullName, email, password } = req.body;
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData) {
        throw new AppError("Invalid Credentials", 400);
    }

    const user = await signupUser(parsedData.fullName, parsedData.password, parsedData.email);
    generateToken(user._id, res);

    const { password, ...userData } = user._doc;
    res.status(201).json({
        success: true,
        message: "signup successfull",
        user: userData
    })
};
console.log("SIGNIN ROUTE HIT");
export const signinController = (req, res) => {
    console.log("signin route hit");
    res.send("ff")
    // res.json({
    //     success: true,
    //     message: "signin route"
    // })
};

export const logoutController = (req, res) => {
    res.json({
        success: true,
        message: "logout route"
    })
}