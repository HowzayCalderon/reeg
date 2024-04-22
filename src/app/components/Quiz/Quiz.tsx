'use client'
import { useState, useRef, useEffect } from "react"



function Quiz({questionData}: any){
    const questionIndex = useRef(0)
    const currentQuestion = questionData[questionIndex.current]
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [ansData, setAnsData] = useState([{
        qID: "",
        isCorrect: "",
        answer: ""
    }])
    function handleClick(e:any){
        let value = e?.target?.value  
        setCurrentAnswer(value)
    }

    function handleNext(e:any){
        let checkAnswer = currentAnswer == currentQuestion.corrAnswer
        let newAnswer:any = {qID: currentQuestion.id, isCorrect: checkAnswer, answer: currentAnswer }
        setAnsData([...ansData, newAnswer])
    }

    // useEffect(() => {
    //     console.log(ansData)
    //     console.log(currentAnswer)
    // }, [ansData,currentAnswer])
    return (
        <>
             <p className="border-2 border-black text-center py-4">{currentQuestion.que} ?</p>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleClick} value={currentQuestion.optionOne}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleClick} value={currentQuestion.optionTwo}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleClick} value={currentQuestion.optionThree}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleClick} value={currentQuestion.optionFour}/>
                <input type="button" value={'Next'} className="cursor-pointer" onClick={handleNext} />
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