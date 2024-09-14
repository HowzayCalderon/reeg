'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Sdashboard from '@/components/Sdashboard/Sdashboard'
import Tdashboard from '@/components/Tdashboard/Tdashboard'

const page = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })
  
  return (
    <>
      {session?.user?.role == "Student" ? <Sdashboard /> :  <Tdashboard role={session?.user.role}/>}
    </>

  )
}

export default page

