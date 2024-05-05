'use client'
import { useState, useRef, useEffect } from "react"
import QuizResult from "../Popup/QuizResult"

function Quiz({questionData, userID}: any){
    const questionIndex = useRef(0)
    const buttonOne = useRef<HTMLInputElement>(null)
    const buttonTwo = useRef<HTMLInputElement>(null)
    const buttonThree = useRef<HTMLInputElement>(null)
    const buttonFour = useRef<HTMLInputElement>(null)
    const currentQuestion = questionData[questionIndex.current]
    const [currentAnswer, setCurrentAnswer] = useState<string>()
    const [corrAnswers, setCorrAnswers] = useState<number>(0)
    const [userDone, setUserDone] = useState<boolean>(false)
    const [ansData, setAnsData] = useState<[]>([])

    // clears button highlight
    function clearButtons(){
        const buttons = [buttonOne, buttonTwo, buttonThree, buttonFour]
        buttons.forEach((button) => {
            if(button.current){
                button.current.className = base
            }
        })
    }
    // function for each question option
    function handleOption(e:any){
        clearButtons()
        let value = e?.target?.value  
        setCurrentAnswer(value)
        e.target.className = selected
    }
    // tracks question number
    function incrementIndex(){
        if(questionIndex.current < questionData.length - 1){
            questionIndex.current++
        }else if(questionIndex.current >= questionData.length - 1){
            questionIndex.current = questionData.length - 1
        }
    }

    function handleNext(e:any){
        let checkAnswer = currentAnswer == currentQuestion.corrAnswer
        checkAnswer ? setCorrAnswers(prev => prev + 1) : null
        let newAnswer: {} = {questionId: currentQuestion.id, isCorrect: checkAnswer, userAnswer: currentAnswer }
        let newData: any = [...ansData, newAnswer]
        incrementIndex()
        clearButtons()
        setAnsData(newData)
    }

    function handleDone(){ 
        let checkAnswer = currentAnswer == currentQuestion.corrAnswer
        checkAnswer ? setCorrAnswers(prev => prev + 1) : null
        let newAnswer:any = {questionId: currentQuestion.id, isCorrect: checkAnswer, userAnswer: currentAnswer }
        let newData: any = [...ansData, newAnswer]
        setAnsData(newData)
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

    // button styling 
    let base = 'block pl-5 cursor-pointer'
    let selected = 'block pl-5 cursor-pointer bg-slate-200'
    return (
        <>
                <p className="border-2 border-black text-center py-4">{currentQuestion.que} ?</p>
                <input type="button" ref={buttonOne} className={base} name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionOne}/>
                <input type="button" ref={buttonTwo} className={base} name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionTwo}/>
                <input type="button" ref={buttonThree} className={base} name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionThree}/>
                <input type="button" ref={buttonFour} className={base} name={"userAnswer"} onClick={handleOption} value={currentQuestion.optionFour}/>
                {questionIndex.current >= questionData.length - 1 ? <input type="button" className="cursor-pointer" value={"Done"} onClick={handleDone}/> : <input type="button" value={'Next'} className="cursor-pointer" onClick={handleNext} />}
                { userDone ? <QuizResult questionsAnswered={questionData.length} correctAnswers={corrAnswers}/> : null}
        </>
    )
}

export default Quiz

/*
    THE ADD ANSWERS ROUTE WILL LOG ANSWERS TO THE DATABASE AS WELL AS 
    ADD STUDENT PERFORMANCE UPDATES TO THE DATABASE (2 QUERIES, 1 ROUTE)


    once all questions are answered
    UI will display a "Done" button which will have the function
    that sends all answerData to the DATAbase. CONSIDER CREATING A 
    POPUP WINDOW THAT LETS STUDENTS CHOOSE HOW MANY QUESTIONS THEY 
    ANSWER IN SINGLE SESSION
 */


