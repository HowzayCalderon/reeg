'use client'
import React from 'react'
import Nav from '../Navbar/Nav'
import { useState, useEffect } from 'react'
import { classContext } from '../../../context'

function Tdashboard({role, id}:{role:unknown|string, id:unknown|string}) {

  const [classData, setClassData] = useState<{}[]|void>()
  const [teachData, setTeacherData] = useState<{}|void>()

    useEffect(() => {
      if(id){
        fetch(`/api/teacher/find?id=${id}`)
        .then((res) => res.json())
        .then((data)=> setTeacherData(data))
        .catch((error) => console.log(error))

      }
        // fetch(`http://localhost:3000/api/class/classes?id=${session?.user.id}`)
        // .then((res) => {res.json()})
        // .then((res)=>{setClassData(res);})
        // .catch((error)=>{console.log(error)})

    },[])

    useEffect(()=>{
      teachData ? console.log(teachData): console.log('nope')
    },[teachData])

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