'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/UserForm/Form";
import Link from "next/link";

const SignUp = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: ''
    })

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
            placeholder: "Enter Password"
        },
        {
            key: 2,
            labelName: 'Confirm Password',
            id: 'confirmPassword',
            type: 'password',
            placeholder: 'Retype Password'
        }
    ]

    const handleChange = (e: any) => {
        const value = e?.target?.value
        const name = e?.target?.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    }

    const checkPasswords = () => {
        const regexp = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)
        if(formData.password !== formData.confirmPassword){
            setErrorMessage('Passwords do not match')
            return false
        }else if(!regexp.test(formData.password)){
            setErrorMessage('Password Failed')
            return false
        }else{
            return true
        }
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault()
            if(checkPasswords()){
            const res = await fetch("/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: formData.name, password: formData.password})
            })
            if(!res.ok){
                const response = await res.json()
                setErrorMessage(response.message);
            }else{
                router.refresh()
                router.push('/signin')
                }
        }
    }    


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <Form data={data} submitValue="Sign Up" handlesubmit={handleSubmit} handlechange={handleChange}/>
                <p>{errorMessage}</p>
                <Link  className='block text-center' href={'/signin'}>Already have an account?</Link>
                <ul>
                    <li>Password Guidelines:</li>
                    <li> Must contain 8 characters or more</li>
                    <li> Must contain one uppercase letter</li>
                    <li> Must contain one number</li>
                    <li> Must contain one special character</li>
                </ul>
            </div>
        </div>
    )
}

export default SignUp

// On first sign in ask user if they are a teacher or a student, if they are signing in using a provider ask them to change their username