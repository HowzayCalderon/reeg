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

    function incrementIndex(){
        if(questionIndex.current < questionData.length - 1){
            questionIndex.current++
        }else if(questionIndex.current >= questionData.length - 1){
            questionIndex.current = questionData.length - 1
        }
    }

    function handleNext(e:any){
        let checkAnswer = currentAnswer == currentQuestion.corrAnswer
        let newAnswer:any = {qID: currentQuestion.id, isCorrect: checkAnswer, answer: currentAnswer }
        setAnsData([...ansData, newAnswer])
        incrementIndex()
    }

    function handleDone(){
        
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
                {questionIndex.current >= questionData.length - 1 ? <input type="button" value={"Done"} /> : <input type="button" value={'Next'} className="cursor-pointer" onClick={handleNext} />}
        </>
    )
}

export default Quiz

/*
    finish writing the handleNext function still having issue when
    array of questions are done. once all questions are answered
    UI will display a "Done" button which will have the function
    that sends all answerData to the DATAbase. CONSIDER CREATING A 
    POPUP WINDOW THAT LETS STUDENTS CHOOSE HOW MANY QUESTIONS THEY 
    ANSWER IN SINGLE SESSION
 */