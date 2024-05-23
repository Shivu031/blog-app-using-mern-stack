const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userProfile:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        dafault:false
    },
},
{timestamps:true}
);

//? secure the password with the bcrypt
UserSchema.pre("save", async function () {
    const user = this;
    console.log("actual data ", this);
  
    if (user.isNew) {
        try {
            const saltRound = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, saltRound);
            user.password = hashedPassword;
          } catch (error) {
            return next(error);
          }
    }
  
    
});

UserSchema.methods.generateToken = async function () {
    console.log("I am token");
    try {
        return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

  // compare Password
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
  

module.exports = mongoose.model("User",UserSchema);