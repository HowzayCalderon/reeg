'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { classContext } from '../../../context'
import Sdashboard from '@/components/Sdashboard/Sdashboard'
import Tdashboard from '@/components/Tdashboard/Tdashboard'

const page = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })
  const [classData, setClassData] = useState<any>()
  const [teachData, setTeacherData] = useState()

  if(session?.user.role !== "Student"){
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
      
    })

    
  }

  

  return (
    <>
      {session?.user?.role == "Student" ? <Sdashboard /> : <classContext.Provider value={classData}> <Tdashboard role={session?.user.role}/> </classContext.Provider> }
    </>

  )
}

export default page

