"use client"
import React from "react"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [formData, setFormData] = useState({
        role: "",
        username: "",
        email: session?.user.email
    })

    const handleChange = (e: any) => {
        e.preventDefault()
        const value = e?.target?.value
        const name = e?.target?.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        formData.email = session?.user.email
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch("api/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({role: formData.role, username: formData.username, email: formData.email})
        }).then((res) => {
            if(res.ok){
                router.push("/dashboard")
            }

        })
    }
    console.log(formData)

    return (
        <div>
            <p>new User Page</p>
            <form onSubmit={handleSubmit} className="border-black border-2 w-1/2 mx-auto grid grid-cols-2 px-2">
                <button  id="teacher" onClick={handleChange} name="role" value="Teacher">Teacher</button>
                <button id="student" name="role" onClick={handleChange}value="Student">Student</button>
                <input onChange={handleChange} className="col-span-2 content-center"type="text" name="username" id="username" placeholder="Username"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Page



