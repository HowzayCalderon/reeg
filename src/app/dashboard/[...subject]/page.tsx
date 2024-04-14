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
            setQuestions(data)
        })
    },[])


    return (
        <>
            <p>{qs[0].que} ?</p>
            <ol>
                <li>{qs[0].optionOne}</li>
                <li>{qs[0].optionTwo}</li>
                <li>{qs[0].optionThree}</li>
                <li>{qs[0].optionFour}</li>
            </ol>
        </>
    )
}



