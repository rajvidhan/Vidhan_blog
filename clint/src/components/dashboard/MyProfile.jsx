import React, { useEffect, useRef, useState } from "react";
import { HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../common/IconBtn";
import { MdAddBox } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "react-circular-progressbar/dist/styles.css";
import { Alert, Button, TextInput } from "flowbite-react";

import { FiTrash2 } from "react-icons/fi";
import {
  deleteUser,
  updateProfile,
} from "../../../services/operations/userDetaillsApi";
import { setToken, setUser } from "../../redux/user/userSlice";
import ConfirmationModal from "../common/ConfirmationModal";

const MyProfile = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [editflag, setEditFlag] = useState(false);
  const [previewSourse, setPreViewSource] = useState(null);
  const [imageFile, setImageFile] = useState(null);
   const [loading,setloading] = useState(false);



  const { token } = useSelector((state) => state.user);

  const filePickerRef = useRef();

  const handleImagechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("image", imageFile);

      formData.append("username", data.username);

      formData.append("email", data.email);

      formData.append("password", data.password);

      const res = await updateProfile(formData, token);

      if (res) {
        dispatch(setUser(res));
        setEditFlag(false);
      }
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreViewSource(reader.result);
    };
  };

  // handle delete user functionality

  const [ConfirmationModaldata, setconfirmationmodaldata] = useState(null);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const result = await deleteUser(token);

      if (result) {
        dispatch(setUser(null));
        dispatch(setToken(null));
        setconfirmationmodaldata(null);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  // handle logout 
  const handleLogOut = ()=>{
    navigate("/login");
    dispatch(setUser(null));
    dispatch(setToken(null));
    setconfirmationmodaldata(null);
  }

  return (
    <div className="xl:w-11/12 xl:mx-[80px] md:max-w-[1000px] py-10 pl-5">
      {/* heading  */}
      <div className="flex p-1   gap-x-3 items-center ">
        <HiUser className="text-3xl" />
        <h1 className=" text-[45px] ">Profile</h1>
      </div>
      <hr className="text-gray-500 " />

      <div className=" md:ml-[175px] md:w-full">
        {/* section 1 */}
        <div
          className={`flex md:flex-row flex-col mx-2  border-richblack-600 border-[1px] mt-[70px] rounded-xl items-center md:justify-between justify-center ${
            theme === "light" ? "bg-richblack-700" : "bg-[rgb(16,23,42)]"
          } p-[30px]`}
        >
          <div className="flex md:flex-row flex-col items-center justify-center md:gap-x-[30px] ">
            <img
              src={currentUser.image}
              className="aspect-square w-[88px] rounded-full object-cover"
            />
            <div className="flex flex-col ">
              <p className="text-[35px]  text-white">{currentUser?.username}</p>
              <p
                className={`text-[20px] ${
                  theme === "light" ? "text-white" : "text-richblack-300"
                } `}
              >
                {currentUser?.email}
              </p>
            </div>
          </div>
          <div className="p-[10px]">
            <IconBtn text="Edit" onclick={() => setEditFlag(!editflag)}>
              {" "}
              <RiEditBoxLine />
            </IconBtn>
          </div>
        </div>

        {editflag && (
          <div
            className={`flex mx-2 flex-col  items-center justify-center  border-richblack-600 border-[1px] mt-[70px] rounded-xl   ${
              theme === "light" ? "bg-richblack-700" : "bg-[rgb(16,23,42)]"
            } p-[30px]`}
          >
            <h1
              className={`font-bold mb-7 text-xl  ${
                theme === "light" ? "text-white" : "text-white"
              } `}
            >
              Edit Profile
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                ref={filePickerRef}
                onChange={handleImagechange}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-y-6">
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="relative"
                >
                  <img
                    src={previewSourse || currentUser.image}
                    className={`aspect-square w-[88px] cursor-pointer rounded-full object-cover`}
                  />
                </div>

                <TextInput
                  className=" md:w-[600px] w-[250px]"
                  placeholder="userName"
                  id="username"
                  {...register("username", { required: true })}
                  type="text"
                  defaultValue={currentUser.username}
                />
                <TextInput
                  className=" md:w-[600px] w-[250px]"
                  placeholder="email"
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  defaultValue={currentUser.email}
                />
                <p className="text-white ">
                  If you have to change the password then put the new password
                  else put the old password 😊
                </p>
                <TextInput
                  className=" md:w-[600px] w-[250px]"
                  placeholder="new password"
                  {...register("password")}
                  id="password"
                  type="password"
                />
                <Button type="submit" outline className="bg-caribbeangreen-400">
                  Update
                </Button>
              </div>
            </form>
          </div>
        )}


        {
          currentUser.isAdmin && (
           <Link to={"/create-post"}>
            <Button type="button"
           color="gray"
            className="w-full  my-[70px] p-1 flex "
            outline
            disabled={loading}
            >
            <span className="mr-2">Create A Post</span>
           <MdAddBox />
            </Button>
           </Link>
          )
        }

        {/* delete section  */}
        <div className="flex mx-2  gap-x-4 my-[50px] items-center rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 text-richblack-5 justify-between ">
          <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 ">
            <FiTrash2 className="text-3xl text-pink-200" />
          </div>

          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete Account
            </h2>
            <div className="e-3/5 text-pink-25">
              <p>Would you like to delete account?</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setconfirmationmodaldata({
                  text1: "Are you sure ??",
                  text2: "Would you want to delete your account",
                  btn1Text: "Delete",
                  btn1Handler: () => handleDelete(),
                  btn2Text: "Cancle",
                  btn2Handler: () => setconfirmationmodaldata(null),
                })
              }
              className="w-fit px-4 py-3 font-bold bg-pink-200 rounded-md cursor-pointer italic text-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* sign out functionality  */}

        <div
          className={`flex md:flex-row cursor-pointer flex-col mx-2   border-richblack-600 border-[1px] mt-[70px] rounded-xl items-center justify-center ${
            theme === "light" ? "bg-richblack-700 text-white font-bold" : "bg-[rgb(16,23,42)] text-white font-bold"
          } p-[30px]`}
          onClick={()=>{
            setconfirmationmodaldata({
              text1: "Are you sure ??",
                  text2: "Would you want to log out ",
                  btn1Text: "Logout",
                  btn1Handler: () => handleLogOut(),
                  btn2Text: "Cancle",
                  btn2Handler: () => setconfirmationmodaldata(null),
            })
          }}
        >
          <button className="text-xl">Log out</button>
        </div>
      </div>

      {ConfirmationModaldata && (
        <ConfirmationModal modalData={ConfirmationModaldata} />
      )}
    </div>
  );
};

export default MyProfile;
