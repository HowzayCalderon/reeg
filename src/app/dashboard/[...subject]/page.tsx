"use client"
import React from "react";
import { useEffect, useState } from "react";



export default function Page({ params }: { params: { subject: string }}){
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
        fetch(`/api/subject/questions?subject=${params.subject}`)
        .then((res) => res.json())
        .then((data) => {
            setQuestions(data[0].questions)
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



