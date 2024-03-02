const jwt = require("jsonwebtoken")

require("dotenv").config();


exports.auth = (req,res,next)=>{
try{

    const token = req.cookies.access_token || req.header("Authorization").replace("Bearer ", "");;

   
    
    if(!token){
        return res
        .json({
          success: false,
          msg: "token is not found ",
        })
        .status(200);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(401, 'Unauthorized'));
      }     
 
      req.user = user;
      next();
    });
}catch(error){
console.log("Error occure when user is verify")
}
}