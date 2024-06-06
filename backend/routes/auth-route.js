const User = require("../models/User-Model");

const router = require("express").Router();

// REGISTER THE USER
router.post("/register",async(req,res)=>{
    try{
        console.log(req.body);
        const {username, email, password} = req.body;

        const usernameExist = await User.findOne({username:username});
        const userExist = await User.findOne({ email: email });
        
        if(usernameExist){
            return res.status(400).json({ msg: "username already exists" });
        }
        if (userExist) {
        return res.status(400).json({ msg: "email already exists" });
        }
        
        const userCreated = await User.create({ username, email, password });
        // res.status(201).json({msg:"Registration Successfull."});
        
        res.status(201).json({ 
            msg: "Registration Successfull",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            username: userCreated.username ,
            email: userCreated.email,
            userProfile: userCreated.userProfile
        });
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
});

// LOGIN USER
router.post("/login",async(req,res)=>{
    try{
        const { email, password } = req.body;

        const userExist = await User.findOne({ email:email });

        if(!userExist) {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordValid = await userExist.comparePassword(password);
        if (isPasswordValid) {
            const token = await userExist.generateToken();
            const userData = {
                userId: userExist._id.toString(),
                username: userExist.username,
                email: userExist.email,
                userProfile: userExist.userProfile, 
            };
            res.status(200).json({
                message: "Login Successful",
                token: token,
                user: userData,
            });
        } else {
            res.status(401).json({ message: "Invalid email or password " });
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;