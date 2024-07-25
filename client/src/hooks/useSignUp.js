import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";
const useSignUp = () => {
  const [loading, setLoading] = useState(false);
   const{authUser,setAuthUser}= useAuthContext()
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const sucess = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!sucess) return;
    setLoading(true)
    try {
        const res = await fetch("http://localhost:5000/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})
        })
        const data = await res.json();
        console.log(data);
        if(data.error){
          throw new Error(data.error)
        }
        //ls
        localStorage.setItem("chat-user",JSON.stringify(data))
        //context
        setAuthUser(data);
    } catch (error) {
        toast.error(error.message)
        
    }finally{
        setLoading(false)
    }
  };
  return {loading,signup}
};

export default useSignUp;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("This didn't work.");
    return false
  }
  if(password !== confirmPassword){
    toast.error('password didnt match')
    return false
  }

  if(password.length <6){
    toast.error("password must be at least 6 chacter")
    return false

  }
  return true
}
