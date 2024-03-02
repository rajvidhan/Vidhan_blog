import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaThumbsUp } from "react-icons/fa";

const Comment = ({comment,onLike}) => {
const userId= comment.userId;
const [userData,setUserData] = useState(null);
const {theme} = useSelector((state)=>state.theme)


useEffect(()=>{

    const fetchuserData = async ()=>{
     try{
      const res = await fetch(`/api/v1/comment/userdetails/${userId}`);
      if(res.ok){
         const data = await res.json();
         setUserData(data.data);
      }
     

     }catch(error){
      console.log(error.message)
     }
    }
    fetchuserData();

},[])


  return (
    <div className={`flex p-4 border-b ${theme==="dark" && "border-gray-600 text-sm"}`}>
         <div className='flex-shrink-0 mr-3'>
          <img className='w-10 h-10 rounded-full bg-gray-200' src={userData && userData.image}  />
         </div>
         <div className='flex-1' >
            <div className='flex items-center mb-1' >
              <span className='font-bold mr-1 text-xs'>{userData ? `@${userData.username}`:"anonymous user"}</span>
              <span className='text-gray-500 text-xs'>
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className={`text-gray-500 mb-2`}>{comment.content}</p>
            <div>
              <button>
                <FaThumbsUp />
              </button>
            </div>
         </div>
    </div>
  )
}

export default Comment
