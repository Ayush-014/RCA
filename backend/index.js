import express from "express";
import dotenv from "dotenv";
import { router } from "./src/routes/v1/index.route.js";

dotenv.config();

const app = express();
app.use("/api/v1", router);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
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