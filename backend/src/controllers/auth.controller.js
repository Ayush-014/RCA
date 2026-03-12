export const signupController = (req,res) => {
    res.json({
        success: true,
        message: "signup route"
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