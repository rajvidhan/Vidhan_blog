import React, { useState, useSyncExternalStore } from "react";
import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon,FaSun } from "react-icons/fa";
import { FaSearchengin } from "react-icons/fa";
import {toggleTheme} from '../redux/theme/theme.Slice'
import {  HiLogout } from 'react-icons/hi';
import {useDispatch, useSelector} from "react-redux"
import { CgProfile } from "react-icons/cg";
import { setToken, setUser } from "../redux/user/userSlice";


const Header = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  // uselcation ka use krenge path ka pta krne k liye
  const path = useLocation().pathname;
  const {currentUser} =  useSelector((state)=>state.user);
  

  const {theme} = useSelector((state)=>state.theme);
   

  const handleSignOut = ()=>{
    navigate("/login");
    dispatch(setUser(null));
    dispatch(setToken(null));
  }


  return (
    <Navbar className="border-b-2">
      {/* first create a logo  */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl
         font-semibold dark:text-white "
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-500
            via-purple-500 to-pink-500 rounded-lg text-white"
        >
          Vidh's
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={FaSearchengin}
          className="hidden lg:inline"
        />
      </form>
      {/* pill use for make little bit rounded  */}
      <Button  className="w-12 h-10  lg:hidden" pill color="gray">
        <FaSearchengin />
      </Button>

      <div  className="flex gap-5 md:order-2">
        <Button onClick={()=>dispatch(toggleTheme())} className="w-12 h-10 hidden sm:inline" pill color="gray">
       {
        theme === "light" ? <FaSun /> : <FaMoon />
       }
        </Button>
       {
        !currentUser ? (
          <Link to="/login">
          <Button outline gradientDuoTone="purpleToBlue">
            Login
          </Button>
           </Link>
        ) :(
          <Dropdown label={<Avatar 
          alt="user"
          img={currentUser.image}
          rounded
          />} inline >
      <Dropdown.Header>
        <span className="block text-sm">{currentUser.username}</span>
        <span className="block truncate text-sm font-medium">{currentUser.email}</span>
      </Dropdown.Header>
      <Link to={"/dashboard?tab=profile"}>
      <Dropdown.Item icon={CgProfile}>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiLogout} onClick={()=>handleSignOut()}>Sign out</Dropdown.Item>
    </Dropdown>

        )
       }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}  active={path === "/about"}>
          <Link   to="/about" >About</Link>
        </Navbar.Link>
       
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
