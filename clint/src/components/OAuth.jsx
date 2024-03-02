import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { setUser, setToken } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'



const OAuth = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
  const auth = getAuth(app);

const handleGoogleClick = async ()=>{
     const provider =new GoogleAuthProvider();
     provider.setCustomParameters({prompt:"select_account"})
    //  for open the pop up window 
     try{
          const resultFromGoogle =  await signInWithPopup(auth,provider);
          const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },           
            body:JSON.stringify({
              name:resultFromGoogle.user.displayName,
              email:resultFromGoogle.user.email,
              googlePhotoUrl:resultFromGoogle.user.photoURL            
            })
          })

          const data = await res.json();
          console.log("data is ", data)
          if(res.ok){
            dispatch(setToken(data.token));
            dispatch(setUser(data.data))
            navigate("/");
          }
     }catch(error){
      console.log(error.message);

     }
}


  return (
    <Button type='button' onClick={handleGoogleClick} gradientDuoTone="pinkToOrange" outline>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
    Continue with Google
    </Button>
  )
}

export default OAuth
