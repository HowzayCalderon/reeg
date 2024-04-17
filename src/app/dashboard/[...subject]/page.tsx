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
            console.log(data)
            setQuestions(data)
        })
    },[])


    return (
        <>
            <Quiz A={qs[0].optionOne} B={qs[0].optionTwo} C={qs[0].optionThree} D={qs[0].optionFour} question={qs[0].que} qID={qs[0].id}/>
        </>
    )
}


/*
    write logic to iterate through array of questions, figure out how the 
    forms of answered questions will be saved and sent to the backend,
   ADD 'STUDY' AND 'STATS' BUTTONS TO THE DASHBOARD SUBJECT BUTTONS TO 
   DISTINGUISH BETWEEN SHOWING DATA AND SHOWING QUIZING STUDENTS
 */
