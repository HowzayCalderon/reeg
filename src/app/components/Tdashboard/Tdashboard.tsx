'use client'
import React from 'react'
import { useEffect, useState } from 'react'

function Tdashboard({role, id}: any) {
  const [tData, setTData] = useState({})

  
  useEffect(() => {
    fetch(`http://localhost:3000/api/teacher/find?id=${id}`)
    .then((data) => data.json())
    .then((res) => {
      console.log(res)
      setTData(res)
    })
    
  }, [])

  return (
    <div className='grid grid-cols-3 gap-0.5 my-1'>
        <section className='border-black border-2 rounded'>
          <h1>{`Welcome ${role}`}</h1>
        </section>
        <section className='border-black border-2 rounded h-10 col-span-2'>
          <h1 className='border-b-2 border-black w-1/2'>Classes</h1>
        </section>
    </div>
  )
}

export default Tdashboard

/* 
  TWEAK DATABASE CALL TO RETURN CLASSES AND STUDENT INFO 
*/