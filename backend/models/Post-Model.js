const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:[{
        type:{
            type:String,
            enum:['text', 'image', 'font'],
            required:true
        },
        data:{
            type:String,
            required:true
        },
        attributes: {
          type: Object, // To store font, bold, italic, underline, etc.
          default:{}
        }
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
    }]
    
},
{timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);
