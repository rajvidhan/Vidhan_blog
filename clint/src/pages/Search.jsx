import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PostAnimatedCard from "../components/common/PostAnimatedCard";
import { useSelector } from "react-redux";

const Search = () => {
  const { token } = useSelector((state) => state.user);
  const navigate= useNavigate();
  const [sidebarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showmore, setShowMore] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTErnFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTErnFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sidebarData,
        searchTerm: searchTErnFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPOsts = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/post/getAllPosts?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.data);
      }
    };
    fetchPOsts();
  }, [location.search]);


const handleChange = (e)=>{
  if(e.target.id === "searchTerm"){
    setSideBarData({...sidebarData,searchTerm:e.target.value});
  }
  if(e.target.id === "sort"){
    const order = e.target.value || 'desc';
    setSideBarData({...sidebarData,sort:order});
  }
  if(e.target.id === "category"){
    const category = e.target.value || "uncategorized"
    setSideBarData({...sidebarData,category:category});
  }
}

const handleSubmit = (e)=>{
  e.preventDefault();

  const urlParams = new URLSearchParams(location.search);
  urlParams.set("searchTerm",sidebarData.searchTerm)
  urlParams.set("sort",sidebarData.sort)
  urlParams.set("category",sidebarData.category)

  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);

}

window.onload = function() {
  setSideBarData({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  navigate("/search")
};

let POST;
if(showmore) {
  POST = posts;
} else {
  POST = posts.slice(0, 6);
}

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}
        >
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select
              onChange={handleChange} value={sidebarData.sort} id='sort'
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
            onChange={handleChange}
            value={sidebarData.category}
            id='category'
            >
              <option value={"uncategorized"}>Select a category</option>
              <option value={"javascript"}>Javascript</option>
              <option value={"react"}>Reactjs</option>
              <option value={"python"}>Python</option>
              <option value={"machinelearning"}>Machine Learning</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            POST &&
            POST.map((post) => (
              <PostAnimatedCard key={post._id} post={post} />
            ))}
          {POST.length > 5&& (
          <button
           onClick={()=>setShowMore(!showmore)}
            className='text-teal-500 text-lg hover:underline p-7 w-full'
          >
            Show{`${showmore ? " Less":" More"}`}
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Search;
