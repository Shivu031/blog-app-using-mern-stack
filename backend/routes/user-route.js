const authMiddleware = require("../middlewares/auth-middleware");
const User = require("../models/User-Model");

const router = require("express").Router();

// UPDATE USER
router.put("/:id",authMiddleware,async(req,res)=>{
    const { username, email, userProfile } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.userProfile = userProfile || user.userProfile;
    
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg:error.msg });
    }
});


// DELETE USER
router.delete("/:id",authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        await User.deleteOne({ _id: req.params.id });
        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET USER
router.get("/:id", authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ALL USERS
router.get("/", async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

module.exports = router;