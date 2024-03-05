import React, { useEffect, useState } from "react";
import { userEndpoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { useSelector } from "react-redux";
import PostCard from "../common/PostCard";

const POsts = () => {
  const { ALL_POST } = userEndpoints;
  const { token } = useSelector((state) => state.user);
  const {theme} = useSelector((state)=>state.theme)

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPOsts = async () => {
      const POSTS = await apiConnector("POST", ALL_POST, null, {
        Authorization: `Bearer ${token}`,
      });

      if (POSTS.data.success) {
        setPosts(POSTS.data.data);
      }
    };
    fetchPOsts();
  }, [token]);

  return (
    <div className={` ${theme === "light" ? "bg-[#fff]":"bg-richblack-800"} lg:w-full rounded-lg  m-5`} >
      <div className="flex flex-col m-4 ">
        <h1 className={`text-4xl ${theme==="light" ? "text-black":"text-white"} `}>Posts 😊</h1>

       {
        posts && (
          <PostCard posts={posts} />
        )    
       }


      </div>
    </div>
  );
};

export default POsts;
