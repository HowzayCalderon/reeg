"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



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
            <p className="border-2 border-black text-center py-4">{qs[0].que} ?</p>
            <ul className="pl-5 list-decimal">
                <li>{qs[0].optionOne}</li>
                <li>{qs[0].optionTwo}</li>
                <li>{qs[0].optionThree}</li>
                <li>{qs[0].optionFour}</li>
            </ul>
        </>
    )
}


/*
    write logic to iterate through array of questions, figure out how the 
    forms of answered questions will be saved and sent to the backend,
    add correctAnswer slot to question model
 */
