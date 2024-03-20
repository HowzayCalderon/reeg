"use client"
import React from "react"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "domain";

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
            }).then(() => {
                if(formData.role == 'Teacher'){
                    const createTeacher = async () => {
                        const res = await fetch("api/teachers", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({userId: session?.user.id})
                        })
                        createTeacher()
                    }
                    router.push("/dashboard")
                }

            })

        /* create function to link user account to a type of account 
        depending on role they choose also create route method for 
        teacher and student routes to handle request 
        
        ****** CONSIDER CREATING A NESTED ROUTE INSIDE NEWUSER FOLDER FOR 
        USERS WHO SELECT STUDENT AS THEIR ROLE OPTION BECAUSE THE STUDENT
        ROLE REQUIRES MORE INFORMATION TO CREATE IN DATABASE 
        
        ****** createTeacher portion of handleSubmit function still not
        working */
    }


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



