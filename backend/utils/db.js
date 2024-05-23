const  mongoose  = require("mongoose");

const url = "mongodb://127.0.0.1:27017/blog-mern-stack";

const connectionDb = async()=>{
    try{
        await mongoose.connect(url);
        console.log("Connection successfull to database");
    }catch(error){
        console.log("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectionDb;