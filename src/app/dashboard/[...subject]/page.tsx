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
    topicId: 0
    }])
    
    useEffect(() => {
        fetch(`/api/questions/getquestions?name=${params.subject}&user=${session?.user.id}`)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data)
            console.log(data)
        })
    },[])


    return (
        <>
            <Quiz questionData={qs} userID={session?.user?.id}/>
        </>
    )
}


/*
    
   ADD 'STUDY' AND 'STATS' BUTTONS TO THE DASHBOARD SUBJECT BUTTONS TO 
   DISTINGUISH BETWEEN SHOWING DATA AND SHOWING QUIZING STUDENTS
 */
