'use client'
import React from 'react'
import { useEffect, useState } from 'react'

function Tdashboard({role, id}: any) {
  const [tData, setTData] = useState({})

   async function getTeacher(){
    const res = await fetch(`http://localhost:3000/api/teacher/find?id=${id}`,{
      method: "GET",
      headers:{
        "Content-type": "application/json"
    }
    }).then((data) => data.json)
    .then((response) => {
      setTData(response)
      console.log(response)
    })
    
  }

  useEffect(() => {
    getTeacher()
    
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
      REWRITE TEACHER GET METHOD TO INCLUDE CLASS INFO
  .. FINISH FETCH CALL FOR TEACHER DASHBOARD INFORMATION
*/