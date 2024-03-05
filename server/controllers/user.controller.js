const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, password, username } = req.body;


 


    if (!email || !username || !password) {
      return res.json({
        message: "all fields are required",
        success: false,
      });
    }

    const displayPicture = req.files.image;

    if (!displayPicture) {
      return res.json({
        message: "please select a display picture for update..",
        success: false,
      });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );


    
    const hashpassword = await bcrypt.hash(password, 10);



    const userdetails = await User.findByIdAndUpdate(
      { _id: userId },
     {
          username: username,
          email: email,
          password: hashpassword,
          image: image.secure_url,
        },
      { new: true }
    );

 
    return res
      .json({
        data: userdetails,
        success: true,
        message: "Profile update successfully",
      })
      .status(200);
  } catch (error) {
    res
      .json({
        message: error.message,
        success: false,
      })
      .status(400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    await User.findByIdAndDelete({ _id: userId });

    return res
      .json({
        message: "user account deleted",
        success: true,
      })
      .status(200);
  } catch (error) {
    return res
      .json({
        message: "user account not deleted",
        success: false,
      })
      .status(400);
  }
};


exports.GetUsers = async (req,res)=>{
 
  try{
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res.json({
        message: "you are not allow access all user details",
        success: false,
      });
    }
    
    const users = await User.find()
    const totaluser = users.length;
    return res
    .json({
      totaluser:totaluser,
      data:users,
      message: "User data sended",
      success: true,
    })
    .status(200);
  }catch(error){
    return res
    .json({
      message: "sending failed",
      success: false,
    })
    .status(400);
  }
}


exports.DeleteUserByAdmin = async (req,res)=>{

  try{
    const {userId} = req.body;
  
    if(!userId){
      return res.json({
        message:"User is not exist",
        success:false
      });
    }
  
   await User.findByIdAndDelete(userId);
  
   return res.json({
    success:true,
    message:"User is deleted"
   })
  }catch(error){
   return res.json({
    message:"User delete process failed",
    success:false
   })
  }
}