'use client'
import React from 'react'
import { useEffect, useState } from 'react'

import Nav from '../Navbar/Nav'

function Tdashboard({role, id}: any) {
  const [teachData, setTeacherData] = useState()
  const [classData, setClassData] = useState<any>()
  
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/api/teacher/find?id=${id}`),
      fetch(`http://localhost:3000/api/class/classes?id=${id}`)
    ])
    .then((res) => Promise.all(res.map(r => r.json())))
    .then((res) => {
      // console.log(res)
      setTeacherData(res[0])
      setClassData(res[1])
    })
    
  }, [])

  useEffect(() => {
    console.log(classData)
  },[classData])

  return (
    <div className='h-full grid grid-cols-4 gap-0.5 my-1'>
        <section className="row-span-full">
          <Nav classD={classData}/>
        </section>
        <section className='rounded bg-white h-fit p-4'>
          <h1 className=''>{`Welcome, ${role}`}</h1>
        </section>
    </div>
  )
}

export default Tdashboard


/* 
    CONSIDER ADDING CLASSES TO THE NAVBAR, WHEN TEACHER CLICKS ON 
    SPECIFIC CLASS IT TAKES THEM CLASS SPECIFIC DASHBOARD THAT SHOWS
    CHART OF CLASS PROGRESS, THEN MAKE EACH STUDENT AN OPTION TO CLICK ON
    THAT SHOWS THEIR PROGRESS AND STANDINGS ON A CHART
*/

/* 
  Classes added to Navbar, Still need to make each class link direct user to 
  class dashboard when clicked and eventually create dynamic pages for classes
*/