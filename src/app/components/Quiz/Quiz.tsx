'use client'
import { useState, useRef, useEffect } from "react"


function Quiz({questionData, userID}: any){
    const questionIndex = useRef(0)
    const currentQuestion = questionData[questionIndex.current]
    const [currentAnswer, setCurrentAnswer] = useState<string>()
    const [userDone, setUserDone] = useState<boolean>(false)
    const [ansData, setAnsData] = useState<[]>()

    function handleOption(e:any){
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
        let newAnswer:any = {questionId: currentQuestion.id, isCorrect: checkAnswer, userAnswer: currentAnswer }
        let newData: any = ([ansData])
        newData.push(newAnswer)
        incrementIndex()
        setAnsData(newData)
    }

    function handleDone(){ 
        let checkAnswer = currentAnswer == currentQuestion.corrAnswer
        let newAnswer:any = {questionId: currentQuestion.id, isCorrect: checkAnswer, userAnswer: currentAnswer }
        let newData: any = (ansData)
        newData.push(newAnswer)
        setAnsData(newData.slice(1))
        setUserDone(true)
    }

    async function sendData(){
        const response = await fetch(`http://localhost:3000/api/students/addanswers?id=${userID}`, {
            method: 'PUT',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(ansData)
        })
    }

    useEffect(() => {
        if(userDone){
            console.log(ansData)
            sendData()
        }
    }, [userDone])
    
    return (
        <>
                <p className="border-2 border-black text-center py-4">{currentQuestion.que} ?</p>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionOne}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionTwo}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionThree}/>
                <input type="button" className="block pl-5 cursor-pointer" name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionFour}/>
                {questionIndex.current >= questionData.length - 1 ? <input type="button" className="cursor-pointer" value={"Done"} onClick={handleDone}/> : <input type="button" value={'Next'} className="cursor-pointer" onClick={handleNext} />}
        </>
    )
}

export default Quiz

/*
    once all questions are answered
    UI will display a "Done" button which will have the function
    that sends all answerData to the DATAbase. CONSIDER CREATING A 
    POPUP WINDOW THAT LETS STUDENTS CHOOSE HOW MANY QUESTIONS THEY 
    ANSWER IN SINGLE SESSION
 */


