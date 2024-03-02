import React, { useEffect, useState } from 'react'
import {Sidebar} from "flowbite-react"
import { HiArrowSmLeft, HiDocumentText, HiUser} from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import {setUser,setToken} from "../redux/user/userSlice"
import {useDispatch, useSelector} from "react-redux"
import { FaUsers } from "react-icons/fa";
const DashboardSidebar = () => {



    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state)=>state.user)

    const [tab, setTab] = useState("");
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get("tab");
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);


    const handleSignOut = () =>{
      navigate("/login");
      dispatch(setUser(null));
      dispatch(setToken(null));
    }


  return (
    <Sidebar className='w-full md:w-56' >
    <Sidebar.Items>
      <Sidebar.ItemGroup className='flex flex-col gap-1'>
       <Sidebar.Item href="/dashboard?tab=profile" label={currentUser.isAdmin ? "Admin" :"User"} labelColor="dark" active={tab==="profile"} icon={HiUser}>
          Profile
        </Sidebar.Item>
        {
          currentUser.isAdmin && (
           <>
            <Sidebar.Item  active={tab==="posts"} href="/dashboard?tab=posts"  labelColor="dark"  icon={HiDocumentText}>
          Posts
          </Sidebar.Item>
           <Sidebar.Item  active={tab==="users"} href="/dashboard?tab=users"  labelColor="dark"  icon={FaUsers}>
           Users
           </Sidebar.Item>
           </>

          )
        }
        <Sidebar.Item onClick={()=>handleSignOut()}     className="cursor-pointer" icon={HiArrowSmLeft}>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashboardSidebar
