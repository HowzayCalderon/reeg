import React from 'react'

interface props {
    questionsAnswered: number,
    correctAnswers: number
}

function QuizResult({questionsAnswered, correctAnswers}: props) {
  return (
    <>
        <section className='bg-slate-100 w-3/4 mx-auto h-1/2 fixed left-28'>
            <h1>Great Job!</h1>
            <p>You scored:</p>
            <p>{`${questionsAnswered}/ ${correctAnswers}` }</p>
            <p>Correctly</p>
        </section>
    </>
  )
}

export default QuizResult