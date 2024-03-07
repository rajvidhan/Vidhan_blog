import React, { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  CreateBlogPost,
  UploadImage,
} from "../../services/operations/userDetaillsApi";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { register, setValue, getValues, reset, handleSubmit } = useForm();
  const {theme} = useSelector((state)=>state.theme)
  const navigate = useNavigate();
  const [ImageFileUrl, setImageFileUrl] = useState(null);

  const { token } = useSelector((state) => state.user);
  console.log("token is ", token);

  const [content, setContent] = useState("");
  const handleContentChange = (value) => {
    console.log("value is ", value);
    setContent(value);
    setValue("content", value);
  };

  const [image, setImage] = useState(null);
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const ImageUrl = await UploadImage(formData);
    console.log("image url in front ",ImageUrl)
    if (ImageUrl) {
      setImageFileUrl(ImageUrl);
    }
  };

  const onsubmit = async (data) => {
    console.log("data is", data);
    const formData = new FormData();
    formData.append("title", data.title);

    if (ImageFileUrl) {
      formData.append("image", ImageFileUrl);
    }

    formData.append("content", data.content);
    formData.append("category", data.category);

    const result = await CreateBlogPost(formData, token);
    if (result) {
      navigate(`/post/${result._id}`);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
     

      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 sm:flex-row  justify-between">
          <TextInput
            name="title"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            id="title"
            className="flex-1"
          ></TextInput>
          <Select name="category" {...register("category")}>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>Javascript</option>
            <option value={"react"}>Reactjs</option>
            <option value={"python"}>Python</option>
            <option value={"Machine Learning"}>Machine Learning</option>

          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput onChange={handleImageInput} type="file" accept="image/*" />
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
       {
        ImageFileUrl && (
          <div className={`rounded-lg p-3 flex justify-center items-center ${theme==="light"?"bg-[#f5f5f5]":"bg-richblack-900"}`}>
              <img className="h-[350px] rounded-lg" src={ImageFileUrl}  />
          </div>
        )
       }

        <ReactQuill
          value={content}
          onChange={handleContentChange}
          theme="snow"
          placeholder="Write Somthing..."
          className=" h-72 mb-12"
        />

        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
