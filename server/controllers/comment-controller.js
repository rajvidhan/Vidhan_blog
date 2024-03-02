const Comment = require("../models/comment");
const User = require("../models/user");
exports.createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res.json({
        message: "You are not allowed to create comment",
        success: false,
      });
    }

    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });

    return res.json({
      data: newComment,
      message: "Comment is generated",
      success: true,
    });
  } catch (error) {}
};

exports.AllComments = async (req, res) => {
  try {
     const PostId = req.params.postId;
   
    const allComments = await Comment.find({postId:PostId}).sort({
      createdAt: -1,
    });
    
   return  res.status(200).json(allComments);
  } catch (error) {
   
    return res.json({     
      message: error.message,
      success: false,
    });
  }
};


exports.UserData = async (req,res)=>{
try{
  const UserId = req.params.userId;
  
 
  const userrdetails = await User.findById(UserId);
  if(!userrdetails){
    return res.json({
      message:"User is not exist brother",
      success:false
    })
  }
 
  return res.json({
    data:userrdetails,
    message:"successfull",
    success:true
  })

}catch(error){
  return res.json({
    message:error.message,
    success:false
  })
}
}




exports.likeComment = async (req,res)=>{
  try{
  const UserId = req.user.id;
  console.log("user id is ",UserId);

    
   const comment = await Comment.findById(req.params.commentId)
    
   if(!comment){
    return res.json({
      message:"comment does not exist!",
      success:false
    })
   }

   const isLiked = await Comment.find({
    likes:UserId
   });
   if(!isLiked){
    comment.numberOfLikes += 1;
    await Comment.findByIdAndUpdate(req.params.commentId,{
    $push:{
      likes:UserId
    }
    },{new:true})
   }else{
    comment.numberOfLikes -= 1;
    await Comment.findByIdAndUpdate(req.params.commentId,{
      $pull:{
        likes:UserId
      }
      },{new:true})
   }


   const updatedComment = await Comment.findById(req.params.commentId);
    return res.json({
      data:updatedComment,
      message:"successfull",
      success:true
    })
  
  }catch(error){
    return res.json({
      message:error.message,
      success:false
    })
  }
  }