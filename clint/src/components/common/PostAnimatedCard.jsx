import React from 'react'
import { Link } from 'react-router-dom'
const PostAnimatedCard = ({post}) => {
  return (
    <div className='group relative w-full border border-teal-500 transition-all hover:border-2 h-[340px] rounded-lg  sm:w-[430px]  overflow-hidden'>
    <Link to={`/post/${post._id}`}>
    <img src={post.image} className='h-[260px] w-full object-cover
    transition-all duration-300 z-20
    group-hover:h-[200px] ' />
    </Link>
    <div className='p-3 flex flex-col gap-2 '>
        <p className='text-lg font-semibold line-clamp-1'>{post.title}</p>
        <p className='italic text-sm'>{post.category}</p>
   <Link className='z-10 group-hover:bottom-0 bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2 absolute' to={`/post/${post._id}`}>
   Read article
   </Link>
    </div>
    </div>
  )
}

export default PostAnimatedCard
