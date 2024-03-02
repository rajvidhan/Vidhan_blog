import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmationModal from "./confirmationModal";
import { MdDeleteSweep } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { DeleteUserByAd} from '../../../services/operations/userDetaillsApi';
import { LuExternalLink } from 'react-icons/lu';
const Usercard = ({users}) => {


  const {theme}= useSelector((state)=>state.theme)
  const [confirmationmodalData,setConfirmationModalData] = useState(null);
 const {token} = useSelector((state)=>state.user)

  const handleDeleteUser = async (userId)=>{


  const result  = await DeleteUserByAd({ userId: userId },token);

  if(result){
      setConfirmationModalData(false)
      location.reload(true)     
  }
}


  return (
    <div>
    <div className="my-8 text-richblack-5">
        <div
          className={`hidden lg:flex  rounded-t-lg ${
            theme === "light" ? "bg-[#f5f5f5] text-black" : "bg-richblack-500"
          } w-[100%] `}
        >
       
          <p className="w-[30%] px-5 py-3">USER IMAGE</p>
          <p className="w-[20%] px-2 py-3">USERNAME</p>
          <p className="w-[30%] px-2 py-3">EMAIL</p>
          <p className="w-[10%] px-2 py-3">ADMIN</p>
          <p className="w-[10%] px-2 py-3">DELETE</p>
        </div>

        {
        users.length === 0 ? (
          <div className="items-center flex justify-center mt-10 font-bold text-4xl">
            No Users registered Yet
          </div>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className={`flex lg:flex-row  flex-col  lg:items-center my-3  border ${
                theme === "light"
                  ? "hover:bg-white text-black"
                  : " text-richblack-200 hover:bg-richblack-600"
              }  border-richblack-600 rounded-lg`}
            >
              <div className="flex lg:w-[30%] cursor-pointer items-center lg:justify-start justify-center gap-4 px-5 py-3">
                <img
                  src={user.image}
                  className="lg:h-20 lg:w-20 rounded-lg object-cover"
                />
              </div>
              <div className="lg:w-[20%]  px-2 lg:py-3 py-1  ">
                <span
                  className={`px-3 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Name
                </span>
                <span>{user.username}</span>
              </div>
              <div className="lg:w-[30%]  px-2 lg:py-3 py-1 ">
                <span
                  className={`px-3 ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Email
                </span>
                {user.email}
              </div>

             <div className="lg:w-[10%] gap-2 flex items-center  lg:pr-6 px-5 lg:py-3 py-1  ">
              {
                user.isAdmin ? (
                  <>
                  <span
                  className={` ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Admin
                </span>
                  <MdOutlineDoneOutline className='text-caribbeangreen-500' />
                  </>
                 
                ):(
                 
                  <>
                    <span
                  className={` ${
                    theme === "light"
                      ? "text-black font-bold"
                      : "text-richblack-100 font-bold "
                  } lg:hidden`}
                >
                  Admin
                 </span>
                  <ImCross className='text-red-700' />
                  </>
                 
                )
              }
             </div>


              <div onClick={()=>setConfirmationModalData({
                 text1: "Are you sure ??",
                 text2: user.isAdmin ? "If you delete your account the whole Posts are deleted which you created":"Would you want to delete that Account",
                 btn1Text: "Yes I'm Sure",
                 btn1Handler:()=>handleDeleteUser(user._id),
                 btn2Text: "No",
                 btn2Handler: () => setConfirmationModalData(null),
              })} className="lg:w-[10%] flex items-center gap-1 cursor-pointer text-red-700 lg:px-2 px-5 lg:py-3 py-1  ">
                <MdDeleteSweep />
                <span>delete</span>
              </div>             
            </div>
          ))
        )
        }
        
        
        
      </div>
      {
        confirmationmodalData && (
          <ConfirmationModal modalData={confirmationmodalData} />
        )
      }
    </div>
  )
}

export default Usercard
