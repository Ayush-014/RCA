import { signupSchema } from "../types/index.type";
import AppError from "../utils/AppError";

export const signupController = (req,res) => {
    const { fullName, email, password } = req.body;
    const parsedData = signupSchema.safeParse(req.body);
    if(!parsedData) {
        throw new AppError("Invalid Credentials", 400);
    }

    res.json({
        success: true,
        message: "signup successfull"
    })
};
console.log("SIGNIN ROUTE HIT");
export const signinController = (req,res) => {
    console.log("signin route hit");
    res.send("ff")
    // res.json({
    //     success: true,
    //     message: "signin route"
    // })
};

export const logoutController = (req,res) => {
    res.json({
        success: true,
        message: "logout route"
    })
}