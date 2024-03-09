'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";


const page = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated(){
            redirect("/signin")
        },
    });

    
}

export default page


/* MAKE QUESTIONS APPEAR, WRITE CODE TO ASK USERS TO CHOOSE 
THEIR ROLE (STUDENT OR TEACHER), 
DASHBOARD NEEDS TO INCLUDE THE CLASSES A STUDENT IS A PART OF AND GIVE 
OPTION TO CHOOSE WHAT SUBJECT THEY WANT TO WORK ON BASED ON THE CLASS */