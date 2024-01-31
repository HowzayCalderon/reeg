import React from "react";
import Form from "@/components/UserForm/Form";

const SignUp = () => {
    const data = [
        {
            key: 0,
            labelName: 'Username',
            id: 'name',
            onchange: '',
            placeholder: 'Enter Username'
        },
        {
            key: 1,
            labelName: 'Password',
            id: 'password',
            onchange: '',
            placeholder: "Enter Password"
        },{
            key: 2,
            labelName: 'Confirm Password',
            id: 'confirmPassword',
            onchange: '',
            placeholder: 'Retype Password'
        }
    ]
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2">
                <Form data={data} submitValue="Sign In" handlesubmit={''}/>
            </div>
        </div>
    )
}

export default SignUp