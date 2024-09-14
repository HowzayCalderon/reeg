'use client'
import React from 'react'
import Nav from '../Navbar/Nav'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { classContext } from '../../../context'

function Tdashboard({role}: any) {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })

  const [classData, setClassData] = useState<any>(false)
  const [teachData, setTeacherData] = useState()

    useEffect(() => {
      Promise.all([
        fetch(`http://localhost:3000/api/teacher/find?id=${session?.user.id}`),
        fetch(`http://localhost:3000/api/class/classes?id=${session?.user.id}`)
      ])
      .then((res) => Promise.all(res.map(r => r.json())))
      .then((res) => {
        setTeacherData(res[0])
        setClassData(res[1])
      })
      
    },[])

  return (
    <div className='h-full grid grid-cols-4 gap-0.5 my-1'>
      <classContext.Provider value={classData}>
        <section className="row-span-full">
          <Nav listOff={false}/>
        </section>
        <section className='rounded bg-white h-fit p-4'>
          <h1 className=''>{`Welcome, ${role}`}</h1>
        </section>
      </classContext.Provider>
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

/* 
  Created dynamic pages, having trouble when refreshing page, the session
  user id does not get added to the fetch call so nothing is returned after
  refresh, also need to create components and chart for class dashboard
*/