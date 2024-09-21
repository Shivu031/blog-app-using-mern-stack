const User = require("../models/User-Model");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
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

// Forgot Password Request
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email:email });

        if (!user) {
            return res.status(400).json({ message: 'No user found with this email' });
        }
        const resetToken = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '30d' } 
        );

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + (30*24*60*60*1000); 

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-pass/${resetToken}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Email sending error:', err);
                return res.status(500).json({ message: 'Failed to send reset email', error: err.message });
            }

            res.status(200).json({ message: 'Password reset link sent to your email' });
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        // res.status(500).json({ message: 'Internal server error' });
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });

    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        const user = await User.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }
        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;