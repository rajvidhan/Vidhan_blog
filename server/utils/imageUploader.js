const cloudinary = require("cloudinary").v2;
const fs = require("fs")


exports.uploadImageToCloudinary = async (file,folder,height,quality) =>{
        console.log("hello")
           const options ={folder};
          
           if(height){
            options.height = height;
           }
           if(quality){
            options.quality = quality;
           }
           options.resource_type ="auto"; 
           console.log(options)       
           return await cloudinary.uploader.upload(file.tempFilePath,options);  
}