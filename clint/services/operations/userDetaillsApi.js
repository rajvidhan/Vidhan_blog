import  {userEndpoints}  from "../apis"
import {toast} from "react-hot-toast";
import { apiConnector } from "../apiConnector";
const {
    UPDATE_PROFILE,
    DELETE_USER_ACCOUNT,
    CREATE_POST,
    UPLOAD_IMAGE,
    DELETE_POST,
    FETCH_PREV_POST_DATA,
    UPDATE_POST,
    FETCH_USER_DETAILS,
    DELETE_USER_DETAILS,
    CREATE_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT
} = userEndpoints;



export const updateProfile = async (data,token)=>{
  const toastId = toast.loading("Loading...");
   let result = null;
    try{
      console.log("hey i am servicces",UPDATE_PROFILE);
      
      const response = await apiConnector("PUT",UPDATE_PROFILE,data,{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

    
      if(!response.data.success){
        throw new Error("Could not update the profile") 
      }

      console.log("response",response);

      toast.success("update successfully")

      result = response.data.data;

    }catch(error){    
        toast.error("All fields are required");      
    }
    toast.dismiss(toastId);
    return result 
}


export const deleteUser = async (token)=>{

const toastId = toast.loading("Loading..")
let result=null;

try{

  
const response = await apiConnector("DELETE",DELETE_USER_ACCOUNT,null,{
  Authorization: `Bearer ${token}`,
});



if(!response.data.success){
  throw new Error("Could not delete the profile") 
}

toast.success("Profile delete successfully");
result = true


}catch(error){
  console.log(error.message)
  toast.error("could not delete the account..")
}
toast.dismiss(toastId)
return result

}


export const CreateBlogPost = async (formData,token)=>{
  let result = null;
  const toastId = toast.loading("Loading...")
  try{

    const response = await apiConnector("POST",CREATE_POST,formData,{
      Authorization:`Bearer ${token}`
    });

   console.log("create  post response", response);

    if(!response.data.success){
      throw new Error("Could not create the post") 
    }


    toast.success("POST CREATE SUCCESSFULLY");
 
    result = response.data.data

  }catch(error){
    console.log(error.message);
    toast.error("Please use unique title")
  }
  toast.dismiss(toastId)
  return result
}

export const UploadImage = async (image)=>{
  let result = null;
  const toastId = toast.loading("Loading...")
  try{
    console.log("before")
    const response = await apiConnector("POST",UPLOAD_IMAGE,image);

    console.log('response of upload image is ', response);

    if(!response.data.success){
      throw new Error("Could not Upload the image") 
    }

    toast.success("Image Upload Successfully brother..");
    result = response.data.data

  }catch(error){
    console.log(error.message);
    toast.error("Can't upload image to cloudinary")
  }
  toast.dismiss(toastId);
  return result
}

export const DeletePOST = async (data,token)=>{
  let result ;
  const toastId = toast.loading("Loading...")
  try{ 
    const response = await apiConnector("DELETE",DELETE_POST,data,{
      
      Authorization:`Bearer ${token}`,
      
    });

    console.log("delete post response", response)

    if(!response.data.success){
      throw new Error("Could not delete the post") 
    }


    toast.success("Post delete successfully");
    result =  true
  }catch(error){
    console.log(error.message);
    result = false
    toast.error("Can't delete the post")
  }
  toast.dismiss(toastId);
  return result
}


export const fetchpostPreviousData = async (data,token)=>{

  const toastId = toast.loading("Loading..");
  let result;
  try{

    const response = await apiConnector("POST",FETCH_PREV_POST_DATA,data,{
      Authorization: `Bearer ${token}`
    });

    
    if(!response.data.success){
      toast.error(response.data.message)
    }

       result = response.data
  
  }catch(error){
    console.log(error);
    toast.error("Can't fetch the whole data of post")
  }
  toast.dismiss(toastId);
  return result 
}

export const updatethePost = async(data,token)=>{
  const toastId = toast.loading("Loading..");
  let result;
  try{

    const response = await apiConnector("PUT",UPDATE_POST,data,{
      Authorization: `Bearer ${token}`
    });

    
    
      if(!response.data.success){
        throw new Error(response.data.message) 
      }
    

    toast.success("Post update successfully..")
    result = true
  
  }catch(error){
    console.log(error);
    result= false
    toast.error("Can't fetch the whole data of post")
  }
  toast.dismiss(toastId);
  return result
}


export const fetchAllUsers = async(token)=>{
  const toastId = toast.loading("Loading..");
  let result;
  try{

    const response = await apiConnector("GET",FETCH_USER_DETAILS,null,{
      Authorization: `Bearer ${token}`
    });

    console.log("the response of fetch the all useers ..",response)
   
    
      if(!response.data.success){
        throw new Error(response.data.message) 
      }
    

    
    result = response.data
  
  }catch(error){
    console.log(error);  
    toast.error("Can't fetch the users")
  }
  toast.dismiss(toastId);
  return result
}

export const  DeleteUserByAd = async (data,token)=>{
  const toastId = toast.loading("Loading..");
  let result;
  try{

    const response = await apiConnector("DELETE",DELETE_USER_DETAILS,data,{
      Authorization: `Bearer ${token}`
    });

    console.log("the response of delete the useer ..",response)
   

      if(!response.data.success){
        throw new Error(response.data.message) 
      }
    

    toast.success("User Deleted")
    result = true
  
  }catch(error){
    console.log(error);  
    result = false
    toast.error("Can't Delete the user")
  }
  toast.dismiss(toastId);
  return result
}

export const CreateComment = async (data,token)=>{
  const toastId = toast.loading("Loding...");
 
  let result = null;
  try{

 const response = await apiConnector("POST",CREATE_COMMENT,data,{
  Authorization:`Bearer ${token}`
 });

 console.log("the response of create the comment ..",response)
   

  if(!response.data.success){
    throw new Error(response.data.message) 
  }



    result = response.data.data;
    toast.success("Comment Posted SuccessFully");

  }catch(error){
    console.log(error);
    toast.error("Can't Create The Comment");
  }
  toast.dismiss(toastId)
  return result 
}

export const Editcomment = async (data,token)=>{
  const toastId = toast.loading("Loding...");
 
  let result = null;
  try{

 const response = await apiConnector("PUT",EDIT_COMMENT,data,{
  Authorization:`Bearer ${token}`
 });

 console.log("the response of edit the comment ..",response)
   

  if(!response.data.success){
    throw new Error(response.data.message) 
  }



    result = response.data.data;
    toast.success("Comment Edit SuccessFully");

  }catch(error){
    console.log(error);
    toast.error("Can't Edit The Comment");
  }
  toast.dismiss(toastId)
  return result 
}


export const DeleteComment = async (data)=>{
  const toastId = toast.loading("Loding...");
 
  let result = null;
  try{

 const response = await apiConnector("DELETE",DELETE_COMMENT,data);

 console.log("the response of delete the comment ..",response)
   

  if(!response.data.success){
    throw new Error(response.data.message) 
  }



    result = true;
    toast.success("Comment Delete SuccessFully");

  }catch(error){
    console.log(error);
    result=false;
    toast.error("Can't Delete The Comment");
  }
  toast.dismiss(toastId)
  return result 
}
