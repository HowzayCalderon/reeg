'use client'
import { useState } from "react"

interface Options{
    A: string,
    B: string,
    C: string,
    D: string,
    question: string,
    qID: string
}

function Quiz({A, B, C, D, question, qID}: Options){
    const [quizData, setQuizData] = useState([{
        questionID: qID,
        userAnswer: "",
        isCorrect: ""
    }])
    
    return (
        <>
            <p className="border-2 border-black text-center py-4">{question} ?</p>
                <button className="block pl-5">{A}</button>
                <button className="block pl-5">{B}</button>
                <button className="block pl-5">{C}</button>
                <button className="block pl-5">{D}</button>
        </>
    )
}

export default Quiz