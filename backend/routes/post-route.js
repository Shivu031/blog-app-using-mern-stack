const authMiddleware = require("../middlewares/auth-middleware");
const Post = require("../models/Post-Model");
const User = require("../models/User-Model");
const router = require("express").Router();

// CREATE A NEW POST
router.post("/",async(req,res)=>{
    try{
        console.log(req.body);
        const { title, description, author } = req.body;

        const postCreated = await Post.create({ title, description, author });

        res.status(201).json(postCreated);
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

// GET all the posts of any user
router.get("/user/:authorId",async(req,res)=>{
    try{
        const authorId = req.params.authorId;
        const posts = await Post.find({author:authorId});
        if(posts.length === 0){
            res.status(404).json({ msg: 'No posts available for this user' });
        }
        res.json(posts);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

// Like a post
router.post("/:id/like",authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "You already liked this post" });
        }
        post.likes.push(req.user._id);
        await post.save();
        res.status(200).json({ message: "Post liked", likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Unlike a post
router.post("/:id/unlike",authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const index = post.likes.indexOf(req.user._id);
        if (index === -1) {
            return res.status(400).json({ message: "You haven't liked this post" });
        }
        post.likes.splice(index, 1);
        await post.save();
        res.status(200).json({ message: "Post unliked", likes: post.likes.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Comment on a post
router.post("/:id/comments", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = {
            author: req.user._id,
            text: req.body.text
        };
        post.comments.push(comment);
        await post.save();
        res.status(201).json({ message: "Comment added", comments: post.comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search route
router.get('/search/q', async (req, res) => {
    const { query } = req.query;
    try {
        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }
        const posts = await Post.find({ $text: { $search: query } });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;