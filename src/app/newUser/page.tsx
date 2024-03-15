"use client"
import React from "react"
import { useSession } from "next-auth/react";
import { useState } from "react";

const Page = () => {
    const { data: session } = useSession()
    const [formData, setFormData] = useState({
        role: "",
        username: "",
        email: session?.user.email
    })
    return (
        <div>
            <p>new User Page</p>
            <form className="border-black border-2 w-1/2 mx-auto grid grid-cols-2 px-2">
                <button  id="teacher" name="role" value="Teacher">Teacher</button>
                <button id="student" name="role" value="Student">Student</button>
                <input className="col-span-2 content-center"type="text" name="username" id="username" placeholder="Username"/>
            </form>
        </div>
    )
}

export default Page


/* THIS PAGE WILL BE USED TO ASK NEW USERS WHETHER THEY ARE A TEACHER OR A
STUDENT, ALSO IF THEY SIGNED IN USING AN EXTERNAL PROVIDER ASK TO PROVIDE
A USERNAME */