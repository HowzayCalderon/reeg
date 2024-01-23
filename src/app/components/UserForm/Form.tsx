'use client'

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Form = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
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
        if(pathname == '/signup'){
            console.log(formData)
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if(!res.ok){
                const response = await res.json()
                setErrorMessage(response.message);
            }else{
                router.refresh()
                router.push('/')
            }
        }
    }

    return (
        <>
            <form method="post" className="flex flex-col" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className=' border-b-2 border-black'id='name' type='name' name="name" required={true} onChange={handleChange}  placeholder="Enter Username"/>
                <label>Password</label>
                <input className="border-b-2 border-black" id="password" type='password' name="password" required={true} onChange={handleChange} placeholder="Enter Password"/>
                {pathname == '/signup' ? <label>Confirm Password</label> : null}
                {pathname == '/signup' ? (<input className='border-b-2 border-black'id="confirmPassword" required={true} type="password" name="confirmPassword" placeholder="Retype Password"/>) : null}
                {pathname == '/signup' ? <input  className='border-2' type="submit" value={'Sign Up'}/> : <input className="border-2" type="submit" value={'Sign In'}/>}
                {pathname == '/signin' ? <Link href={'/signup'}>Sign Up</Link> : null}
            </form>
            <p>{errorMessage}</p>
        </>
    )
}

export default Form


// need to fix json stringify error, write logic to match password and confirm password
