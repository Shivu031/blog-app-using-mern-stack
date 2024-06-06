const Post = require("../models/Post-Model");
const router = require("express").Router();

// CREATE A NEW POST
router.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        const { title, description, author } = req.body;

        const postCreated = await Post.create({ title, description, author });

        res.status(201).json({msg:"Post created successfully"});
    }catch(err){
        res.status(400).json({message:err.message});
    }   
});

// UPDATE POST
router.put("/:id",async(req,res)=>{
    try{
        console.log(req.body)
        const { title, description } = req.body;
        // console.log(req.params)
        const post = await Post.findById(req.params.id);
        
        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }
    
        post.title = title || post.title;
        post.description = description || post.description;
        
        await post.save();
        res.json(post);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
});

// DELETE POST
router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        
        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }
    
        await Post.deleteOne({ _id: req.params.id });
        res.json({msg:"Post is deleted successfully"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

// GET POST
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({msg:"Post Not Found"});
        }
        res.json(post);
    }catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
});

//GET ALL THE POSTS
router.get("/",async(req,res)=>{
    try{
        const posts = await Post.find();
        if(!posts){
            res.status(404).json({msg:"No Posts Available"});
        }
        res.json(posts);
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

module.exports = router;