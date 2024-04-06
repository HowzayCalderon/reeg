"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
 


export default function Page({ params }: { params: { slug: string }}){
    const { data: session } = useSession({
        required: true,
        onUnauthenticated(){
            redirect("/api/auth/signin")
        }
    })

    return (
        <div>
            <p>{params.slug}</p>
        </div>
    )
}

