import React from 'react'

interface dataObject{
    key: number,
    labelName: string,
    id: string,
    required: boolean,
    onchange: any,
    placeholder: string
}

function Form(props:{data: dataObject[], submitValue: string}) {
    const {data, submitValue} = props
  return (
    <form>
        {data.map((inputs) => {
            return (
                <label className='flex flex-col'>
                    {inputs.labelName}
                    <input id={inputs.id} name={inputs.id} required={inputs.required} onChange={inputs.onchange} placeholder={inputs.placeholder} key={inputs.key}/>
                </label>
            )
        })}
        <input type='submit' value={submitValue}/>
    </form>
  )
}

export default Form
//  write logic to match password and confirm password, add error messages, client side username validation, and client side password validation, add check for username availiblity, fix email name username unique issue
