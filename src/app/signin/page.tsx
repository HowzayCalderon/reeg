'use client'
import React from "react";
import { useState } from "react";
import Form from "@/components/UserForm/Form";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { FaTwitch } from "react-icons/fa"
import { hostname } from "os";

const SignIn = () => {

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <div className=" grid grid-cols-2 justify-items-center">
                    <FcGoogle  className='cursor-pointer text-2xl' onClick={() => signIn("google",{ callbackUrl: "/dashboard" })}/>
                    <FaTwitch className="text-xl cursor-pointer" onClick={() => signIn("twitch", {  callbackUrl: "/dashboard"  })}/>
                </div>
            </div>
        </div>
    )
}

export default SignIn

