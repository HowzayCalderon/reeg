'use client'

import React from "react"
import { usePathname } from "next/navigation"

const Form = () => {
    const pathname = usePathname()
    return (
        <>
            <form>
                <label>Username</label>
                <input id='username' type='username' name="username" required={true} placeholder="coolUsername"/>
                <label>Password</label>
                <input id="password" type='password' name="password" required={true} placeholder="secretPassword"/>
                {pathname == '/signup' ? <input id="confirmPassword" required={true} type="password" name="confirmPassword" placeholder="Confirm Password"/> : null}
                {pathname == '/signup' ? <input type="submit" value={'Sign Up'}/> : <input type="submit" value={'Sign In'}/>}
            </form>
        </>
    )
}

export default Form


// use the path to switch from sign IN form to sign UP form
// create handle submit and handlechange functions inside ./lib/services.tsx