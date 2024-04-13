"use client"
import React from "react";
import { useEffect, useState } from "react";



export default function Page({ params }: { params: { subject: string }}){
    const [questions, setQuestions] = useState()
    useEffect(() => {
        fetch(`/api/subject/questions?subject=${params.subject}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setQuestions(data)
        })
    },[])
    
    questions ? console.log(questions, "yes") : console.log("not yet")
    return (
        <>
            
        </>
    )
}



