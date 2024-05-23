require("dotenv").config();

const express = require("express");
const connectionDb = require("./utils/db");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");

const app = express();

app.use(express.json());

// app.get("/", (req,res)=>{
//     return res.status(200).send("Welcome to my blog application (Mern Stack)");
// })

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);

const PORT = 5000;
connectionDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running at ${PORT}`);
    })
})
