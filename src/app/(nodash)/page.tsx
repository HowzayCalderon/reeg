'use client'
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { FaTwitch } from "react-icons/fa"
import { redirect } from "next/navigation";

const SignIn = () => {

    const {data: session, status} = useSession()
    if(status === 'authenticated'){
        redirect('/dashboard')
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <div className=" grid grid-cols-2 justify-items-center">
                    <p className="col-span-2">Sign In with: </p>
                    <FcGoogle  className='cursor-pointer text-2xl' onClick={() => signIn("google",{ callbackUrl: "/dashboard" })}/>
                    <FaTwitch className="text-xl cursor-pointer" onClick={() => signIn("twitch", {  callbackUrl: "/dashboard"  })}/>
                </div>
            </div>
        </div>
    )
}

export default SignIn

