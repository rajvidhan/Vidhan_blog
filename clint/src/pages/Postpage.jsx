import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { fetchpostPreviousData } from "../../services/operations/userDetaillsApi";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import { userEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import PostAnimatedCard from "../components/common/PostAnimatedCard";


const Postpage = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const { token } = useSelector((state) => state.user);
  const { ALL_POST } = userEndpoints;
  const [posts,setPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      const PostData = await fetchpostPreviousData({ postId: postId }, token);

      if (PostData.success) {
        setPostData(PostData.data);
      }
    };

    fetchPostData();
  }, [postId]);

  useEffect(()=>{
    const fetchPOsts = async () => {
      const POSTS = await apiConnector("POST", ALL_POST, null, {
        Authorization: `Bearer ${token}`,
      });
  
      if (POSTS.data.success) {
        setPosts(POSTS.data.data.slice(0,3));
      }
    };
    fetchPOsts();
  },[token])





  return (
    <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {postData && postData.title}
      </h1>
      <Link
        className="self-center mt-5 "
        to={`/search?category=${postData && postData.category}`}
      >
        <Button color="gray" pill size={"xs"}>
          {postData && postData.category}
        </Button>
      </Link>
      <img
        src={postData && postData.image}
        className="mt-10  p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between mx-auto w-full max-w-2xl text-xs  border-b border-slate-500 p-3 ">
        <span>
          {postData && new Date(postData.createdAt).toLocaleDateString()}
        </span>
        <span className="italic">
          {postData && (postData.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
       className="p-3 max-w-2xl mx-auto post-content"
      dangerouslySetInnerHTML={{__html:postData && postData.content}}>
    
      </div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={postData && postData._id} />
    
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl  mt-5 ">Recent Articals</h1>
        <div className="flex lg:flex-row flex-col gap-5 mt-5 ">
{
  posts && 
  posts.map((post)=>(
    <PostAnimatedCard key={post._id} post={post} />
  ))
}
        </div>
      </div>
    </div>
  );
};

export default Postpage;
