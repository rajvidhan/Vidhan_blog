import React, { useState } from "react";

import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";

import { useSelector } from "react-redux";
import ConfirmationModal from "./confirmationModal";
import { DeletePOST } from "../../../services/operations/userDetaillsApi";
import { Link } from "react-router-dom";


const PostCard = ({ posts }) => {


  const { theme } = useSelector((state) => state.theme);
  const {token} = useSelector((state)=>state.user);
  const [confirmationmodalData,setConfirmationModalData] = useState(null);
  const [showmore, setShowMore] = useState(false);

  let POST;
  if (showmore) {
    POST = posts;
  } else {
    POST = posts.slice(0, 5);
  }

 
  // handle delete 
  const handleDelete = async (PostId)=>{



    const result = await DeletePOST({ PostId: PostId },token);
    if(result){
      setConfirmationModalData(null);
      location.reload(true);
    }

  }

  return (
    <div>
      <div className="my-8 text-richblack-5">
        <div
          className={`hidden lg:flex   rounded-t-lg ${
            theme === "light" ? "bg-[#f5f5f5] text-black" : "bg-richblack-500"
          } `}
        >
          <p className="w-[30%] px-5 py-3">Post Image</p>
          <p className="w-1/6 px-2 py-3">Title</p>
          <p className="flex-1 px-2 py-3">Category</p>
          <p className="flex-1 px-2 py-3">Delete</p>
          <p className="flex-1 px-2 py-3">Edit</p>
        </div>

        {
        posts.length === 0 ? (
          <div className="items-center flex justify-center mt-10 font-bold text-4xl">
            No Posts Created Yet
          </div>
        ) : (
          POST.map((post, index) => (
            <div
              key={index}
              className={`flex lg:flex-row  flex-col  lg:items-center my-3  border ${
                theme === "light"
                  ? "hover:bg-white text-black"
                  : " text-richblack-200 hover:bg-richblack-600"
              }  border-richblack-600 rounded-lg`}
            >
              <div className="flex lg:w-[30%] cursor-pointer items-center lg:justify-start justify-center gap-4 px-5 py-3">
                <Link to={`/post/${post._id}`}>
                <img
                  src={post.image}
                  className="lg:h-20 lg:w-20 rounded-lg object-cover"
                />
                </Link>
              </div>
              <div className="lg:w-1/6  px-2 lg:py-3 py-1  ">
                <span
                  className={`px-3 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Title
                </span>
                <Link to={`/post/${post._id}`}>
                <span>{post.title}</span>
                </Link>
              </div>
              <div className="lg:flex-1 px-2 lg:py-3 py-1 ">
                <span
                  className={`px-3 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Category
                </span>
                {post.category}
              </div>
              <div onClick={()=>setConfirmationModalData({
                 text1: "Are you sure ??",
                 text2: "Would you want to delete your post",
                 btn1Text: "Yes I'm Sure",
                 btn1Handler: () => handleDelete(post._id),
                 btn2Text: "No",
                 btn2Handler: () => setConfirmationModalData(null),
              })} className="lg:flex-1 flex items-center gap-1 cursor-pointer text-red-700 lg:px-2 px-5 lg:py-3 py-1  ">
                <MdDeleteSweep />
                <span>delete</span>
              </div>
              <div className="lg:flex-1 flex  gap-1 items-center cursor-pointer text-caribbeangreen-400  lg:px-2 px-5 lg:py-3 py-1  ">
                <RiEdit2Fill />
                <Link to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                   </Link>
              </div>
            </div>
          ))
        )
        }
        
        
        {
        
        posts.length > 5 && (
          <div
            onClick={() => setShowMore(!showmore)}
            className={`flex items-center cursor-pointer gap-x-1 justify-center mt-10 ${theme==="light" ? "text-yellow-25":"text-yellow-23"} `}
          >
            <h1>Show {showmore ? "Less" : "More"}</h1>
            <LuExternalLink />
          </div>
        )}
      </div>
      {
        confirmationmodalData && (
          <ConfirmationModal modalData={confirmationmodalData} />
        )
      }
    </div>
  );
};

export default PostCard;
