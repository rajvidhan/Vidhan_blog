import React, { useState, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";
import {toast} from "react-hot-toast"
const SignUp = () => {
   const navigate = useNavigate();
  // state for loading and error 
  const [errormessage,setErrorMessage] = useState(null)
  const [loading,setLoading] = useState(false);
  const {theme} = useSelector((state)=>state.theme)
  const [formData, setFormData] = useState({});
  // handle changes input field
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // trim is use tooremove the space in the entry 
  };



  
  // submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation 
    
    if( !formData.username || !formData.email || !formData.password){
          return setErrorMessage("please fill out all fields")
    }
   
   try{
    setLoading(true);
    setErrorMessage(null);
    const res = await fetch('/api/v1/auth/signup',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    
      if(data.success === false){
        setErrorMessage(data.message);
      }
  setLoading(false);
  if(data.success === true){
    toast.success("Signup successfully");
    navigate("/login")
  }
   }catch(error){
    setErrorMessage(error.message);
    setLoading(false);
   }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side  */}
        <div className="flex-1">
          <Link
            to="/"
            className="font-bold
        dark:text-white text-4xl "
          >
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
            via-purple-500 to-pink-500 rounded-lg text-white"
            >
              Vidh's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            You can log in with your your email and password or{" "}
            <span className={`${ theme === "light" ? "text-black": "text-white"} font-bold  text-xl`}>Google</span> also.
          </p>
        </div>
        {/* right side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handlechange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="dummy@gmail.com"
                id="email"
                onChange={handlechange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlechange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" disable={loading} type="submit">
              {
                loading ?(
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span></>
                ):"SignUp"
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/login" className="text-blue-500 font-bold">
              LogIn
            </Link>
          </div>
          {
            errormessage && (
              <Alert className='mt-5 font-bold' color="failure">
                {errormessage}
              </Alert>
            )
          }
        </div>
      </div>
      
    </div>
  );
};

export default SignUp;
