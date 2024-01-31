'use client'
import React from 'react'

interface dataObject{
    key: number,
    labelName: string,
    id: string,
    onchange: any,
    placeholder: string
}

function Form(props:{data: dataObject[], submitValue: string, handlesubmit: any}) {
    const {data, submitValue, handlesubmit} = props

  return (
    <form onSubmit={handlesubmit}>
        {data.map((inputs) => {
            return (
                <label className='flex flex-col' key={inputs.key}>
                    {inputs.labelName}
                    <input  className='border-b-2 border-black' required={true} id={inputs.id} name={inputs.id} onChange={inputs.onchange} placeholder={inputs.placeholder} key={inputs.key}/>
                </label>
            )
        })}
        <input className='block w-full border-2 cursor-pointer' type='submit' value={submitValue}/>
    </form>
  )
}

export default Form
//  write logic to match password and confirm password, add error messages, client side username validation, and client side password validation, add check for username availiblity, fix email name username unique issue
