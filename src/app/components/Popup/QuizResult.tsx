import React from 'react'

interface props {
    questionsAnswered: number,
    correctAnswers: number
}

function QuizResult({questionsAnswered, correctAnswers}: props) {
  return (
    <>
        <section className='bg-slate-100 w-3/4 mx-auto h-1/2 fixed left-28 flex flex-col justify-center'>
            <h1 className='text-center text-5xl'>Great Job!</h1>
            <p className='text-center'>You answered:</p>
            <p className='text-center'>{`${correctAnswers}/${questionsAnswered}`}</p>
            <p className='text-center'>Correctly</p>
        </section>
    </>
  )
}

export default QuizResult


/*
    work on having the project deployed and functional to show 
    people what you are working on. 
*/