require("dotenv").config();

const express = require("express");
const connectionDb = require("./utils/db");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
  
app.use(cors(corsOptions));

app.use(express.json());
app.use("/images",express.static(path.join(__dirname,'/images')));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded");
})

// app.post("/api/uploads",upload.array("file",12),(req,res)=>{
//     res.status(200).json("File has been uploaded");
// })



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
