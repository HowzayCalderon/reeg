'use client'

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Form = () => {
    const pathname = usePathname()
    return (
        <>
            <form className="flex flex-col">
                <label>Username</label>
                <input className=' border-b-2 border-black'id='username' type='username' name="username" required={true} placeholder="Enter Username"/>
                <label>Password</label>
                <input className="border-b-2 border-black" id="password" type='password' name="password" required={true} placeholder="Enter Password"/>
                {pathname == '/signup' ? <label>Confirm Password</label> : null}
                {pathname == '/signup' ? (<input className='border-b-2 border-black'id="confirmPassword" required={true} type="password" name="confirmPassword" placeholder="Retype Password"/>) : null}
                {pathname == '/signup' ? <input type="submit" value={'Sign Up'}/> : <input className="border-2" type="submit" value={'Sign In'}/>}
                {pathname == '/signin' ? <Link href={'/signup'}>Sign Up</Link> : null}
            </form>
        </>
    )
}

export default Form


// use the path to switch from sign IN form to sign UP form
// create handle submit and handlechange functions inside ./lib/services.tsx