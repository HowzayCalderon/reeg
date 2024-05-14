'use client'
import React from "react";
import { useState } from "react";
import Form from "@/components/UserForm/Form";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { FaTwitch } from "react-icons/fa"

const SignIn = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    })
    
    const handleChange = (e: any) => {
        const value = e?.target?.value
        const name = e?.target?.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            username: formData.name,
            password: formData.password,
            callbackUrl: 'https://reeg.vercel.app/dashboard'
        })
    }
    
    const data = [
        {
            key: 0,
            labelName: 'Username',
            id: 'name',
            placeholder: 'Enter Username'
        },
        {
            key: 1,
            labelName: 'Password',
            id: 'password',
            type: 'password',
            placeholder: 'Enter Password'
        }
    ]
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <Form data={data} handlesubmit={handleSubmit} handlechange={handleChange} submitValue="Sign In"/>
                <div className=" grid grid-cols-2 justify-items-center">
                    <p className="border-b-2 text-center my-5 col-span-2 w-full">Or</p>
                    <FcGoogle  className='cursor-pointer text-2xl' onClick={() => signIn("google",{ callbackUrl: "/dashboard" })}/>
                    <FaTwitch className="text-xl cursor-pointer" onClick={() => signIn("twitch", {  callbackUrl: "/dashboard"  })}/>
                </div>
            </div>
        </div>
    )
}

export default SignIn

