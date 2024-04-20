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

    const [ansData, setAnsData] = useState([{
        questionID: "",
        userAnswer: "",
        isCorrect: ""
    }])

    function handleClick(e:any){
        e.preventDefault()
        setAnsData((prevState):any => {
            [
                ...prevState,
                {
                    questionID: qID,
                    userAnswer: e?.target?.value,
                    isCorrect: "false"
                }
            ]

        })

    }
    console.log(ansData)
    return (
        <>
            <p className="border-2 border-black text-center py-4">{question} ?</p>
                <input type="button" className="block pl-5" name={A} onClick={handleClick} value={A}/>
                <input type="button" className="block pl-5" name={B} onClick={handleClick} value={B}/>
                <input type="button" className="block pl-5" name={C} onClick={handleClick} value={C}/>
                <input type="button" className="block pl-5" name={D} onClick={handleClick} value={D}/>
        </>
    )
}

export default Quiz

/*
    SEND DOWN ALL QUESTIONS FROM PARENT THROUGH PROPS, THEN WRITE LOGIC
    TO INCREMENT QUESTIONS INSIDE THIS COMPONENT. FINISH WRITING LOGIC 
    TO SEND ANSWERS TO DATABASE. CONSIDER CREATING A POPUP WINDOW THAT 
    LETS STUDENTS CHOOSE HOW MANY QUESTIONS THEY ANSWER IN SINGLE SESSION
 */