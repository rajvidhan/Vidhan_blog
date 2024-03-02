import React, { useEffect, useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  updatethePost,
  UploadImage,
  fetchpostPreviousData,
} from "../../services/operations/userDetaillsApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {

  const [formData, setFormData] = useState({});
  const navigate =useNavigate();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const [contentValue, setContentValue] = useState("") ;
   
  const postId = useParams().postId;

  // useEffect for fetch the post data
  useEffect(() => {
    const fetchPostData = async () => {
      const PostData = await fetchpostPreviousData({ postId: postId }, token);

      if (PostData.success) {
        setFormData(PostData.data);
        setContentValue(PostData.data.content)
      }
    };
    fetchPostData();
  }, [postId]);

  // image handle section
  const [image, setImage] = useState(null);
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const [ImageFileUrl, setImageFileUrl] = useState(null);
  const handleUploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const ImageUrl = await UploadImage(formData);

    if (ImageUrl) {
      setImageFileUrl(ImageUrl);
    }
  };

  // image ka use Efec
  useEffect(() => {
    if (ImageFileUrl) {
      setFormData({ ...formData, image: ImageFileUrl });
    }
  }, [ImageFileUrl]);

  // content change
  const handleContentChange = (content) => {
    setContentValue(content);
  };
     
  useEffect(() => {
    setFormData({ ...formData, content: contentValue });
  }, [contentValue]);


  // last task is to update the whole post 
  const updatePost = async () => {
    console.log("i was clicked");
    try {
      console.log("teh formdata",formData)
      const result = await updatethePost(formData,token); 
     if(result){
      navigate("/dashboard?tab=posts")
     }

    } catch (error) {
      console.log("erroris", error);
    }
  };
  

  return (
    <div>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>

        {/* form  */}
        <form className="flex flex-col gap-10" >
          <div className="flex flex-col gap-4 sm:flex-row  justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData && formData.title}
            />
            <Select
              name="category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData && formData.category}
            >
              <option value={"uncategorized"}>Select a category</option>
              <option value={"javascript"}>Javascript</option>
              <option value={"react"}>Reactjs</option>
              <option value={"python"}>Python</option>
            <option value={"Machine Learning"}>Machine Learning</option>
            </Select>
          </div>

          {/* file upload section  */}
          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput
              onChange={handleImageInput}
              type="file"
              accept="image/*"
            />
            <Button
              type="button"
              onClick={handleUploadImageToCloudinary}
              gradientDuoTone={"purpleToPink"}
              size="sm"
              outline
            >
              Upload Image
            </Button>
          </div>

          {/* image preview  */}
          {formData && formData.image && (
            <div
              className={`rounded-lg p-3 flex justify-center items-center ${
                theme === "light" ? "bg-[#f5f5f5]" : "bg-richblack-900"
              }`}
            >
              <img className="h-[350px] rounded-lg" src={formData.image} />
            </div>
          )}

          {/* react quils section  */}
          <ReactQuill
            value={contentValue}
            theme="snow"
            onChange={handleContentChange}
            placeholder="Write something..."
            className="h-72 mb-12"
            required
          />

          <Button onClick={()=>updatePost()}  gradientDuoTone={"purpleToPink"}>
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
