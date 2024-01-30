// import { BottomWarning } from "./BottomWarning"
import { useState } from "react"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { SubHeading } from "./SubHeading"
import {useNavigate} from "react-router-dom"
import axios from "axios"

export const Signin = () => {
  const [username,setUsername]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate();

  const handleSubmit=async()=>{
    const response=await axios.post("http://localhost:3000/api/v1/user/signin",{username,password});
    console.log(response.data)
    localStorage.setItem("token",response?.data?.token);
    navigate("/dashboard");
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>setUsername(e.target.value)} placeholder="vishal@gmail.com" label={"Email"} />
        <InputBox onChange={e=>setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSubmit} label={"Sign in"} />
        </div>
        {/* <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} /> */}
      </div>
    </div>
  </div>
}