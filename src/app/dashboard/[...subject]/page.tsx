"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Quiz from "@/components/Quiz/Quiz";


export default function Page({ params }: { params: { subject: string }}){
    const { data: session } = useSession({
        required: true,
        onUnauthenticated(){
            redirect('/signin')
        }
    })
    const [ qs, setQuestions] = useState([{
    difficulty: "",
    id: "",
    optionFour: "",
    optionOne: "",
    optionThree: "",
    optionTwo: "",
    que: "", 
    subjectId: "",
    topic: ""
    }])
    
    useEffect(() => {
        fetch(`/api/questions/getquestions?name=${params.subject}&user=${session?.user.id}`)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data)
        })
    },[])


    return (
        <>
            <Quiz questionData={qs}/>
        </>
    )
}


/*
    write logic to iterate through array of questions, figure out how the 
    forms of answered questions will be saved and sent to the backend,
   ADD 'STUDY' AND 'STATS' BUTTONS TO THE DASHBOARD SUBJECT BUTTONS TO 
   DISTINGUISH BETWEEN SHOWING DATA AND SHOWING QUIZING STUDENTS
 */
