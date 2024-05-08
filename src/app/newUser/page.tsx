"use client"
import React, { useRef } from "react"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Page = () => {
    const router = useRouter()
    const grade = useRef<HTMLInputElement>(null)
    const { data: session } = useSession()
    const [formData, setFormData] = useState({
        role: "",
        username: "",
        gradeLevel: "",
        email: session?.user.email,
        id: session?.user.id
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
        formData.id = session?.user.id
        if(value == "Student"){
            grade.current ? grade.current.className = visible : null
        }else if(value == "Teacher"){
            grade.current ? grade.current.className = hidden : null
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await fetch("api/users/updaterole", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({role: formData.role, username: formData.username, email: formData.email, id: formData.id, gradeLevel: formData.gradeLevel})
            }).then(() => {
                router.push('/dashboard')
            })
            
            
        /* 
        
        ****** CONSIDER CREATING A NESTED ROUTE INSIDE NEWUSER FOLDER FOR 
        USERS WHO SELECT STUDENT AS THEIR ROLE OPTION BECAUSE THE STUDENT
        ROLE REQUIRES MORE INFORMATION TO CREATE IN DATABASE 
        
        */
    }
    // styling
    let hidden = 'hidden'
    let visible = "block"
    return (
        <div>
            <p>new User Page</p>
            <form onSubmit={handleSubmit} className="border-black border-2 w-1/2 mx-auto grid grid-cols-2 p-2">
                <button  id="teacher" onClick={handleChange} name="role" value="Teacher">Teacher</button>
                <button id="student" name="role" onClick={handleChange}value="Student">Student</button>
                {/* <input onChange={handleChange} className="col-span-2 content-center"type="text" name="username" id="username" placeholder="Username"/> */}
                <input type="number" ref={grade} onChange={handleChange}  className={hidden} name="gradeLevel" id="gradeLevel" placeholder="Grade" max={12} min={9}/>
                <button className="block border-2 col-span-2" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Page



