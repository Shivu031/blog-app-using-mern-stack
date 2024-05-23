const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:[{
        type:{
            type:String,
            enum:['text','image'],
            required:true
        },
        data:{
            type:String,
            required:true
        }
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model("Post",PostSchema);