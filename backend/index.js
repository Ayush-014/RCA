import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes/v1/index.route.js";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
    connectDB();
});


// import express from "express";

// const app = express();


// app.get("/", (req,res) => {
//     res.send("hey!");
// })

// const PORT = process.env.PORT || 3001;
// app.listen(PORT , () => {
//     console.log(`Server is listening to port: ${PORT}`)
// })