const  mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",      
    }],
    numberOfLikes: {
        type: Number,
        default: 0,
      },
},
{ timestamps: true });

 module.exports = mongoose.model('Comment',commentSchema)

