import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Usercard from '../common/Usercard'
import {fetchAllUsers} from "../../../services/operations/userDetaillsApi"

const Users = () => {

const {theme}= useSelector((state)=>state.theme)
const [users,setusers] = useState([]);
const {token} = useSelector((state)=>state.user)

useEffect(()=>{
    const fetchUsers = async ()=>{
        const result = await fetchAllUsers(token);
        if(result){
          setusers(result);
        }
    }
    fetchUsers();
},[])



  return (

      <div className={` ${theme === "light" ? "bg-[#fff]":"bg-richblack-800"} lg:w-full rounded-lg  m-5 lg:mx-[250px] lg:my-[50px] `} >
      <div className="flex flex-col m-4 ">
        <h1 className={`text-4xl ${theme==="light" ? "text-black":"text-white"} font-bold`}>Users 👥</h1>
       {
        users && (
          <Usercard users={users}  />
        )    
       }
      </div>
     </div>
  
  )
}

export default Users
