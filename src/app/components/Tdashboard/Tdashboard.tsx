'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import List from '../List/List'
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
          <Nav/>
        </section>
        <section className='rounded bg-white h-fit p-4'>
          <h1 className=''>{`Welcome, ${role}`}</h1>
        </section>
    </div>
  )
}

export default Tdashboard

/* 
  FIND A WAY TO SPLIT THE DATA RETURNED FROM THE PROMISE.ALL() FOR EASE OF
  USE

  **** CREATE COMPONENT FOR CLASSLIST (HAMBURGER COMPONENT OR POPUP WINDOW)
*/