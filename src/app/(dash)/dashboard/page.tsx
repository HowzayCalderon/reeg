'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Sdashboard from '@/components/Sdashboard/Sdashboard'
import Tdashboard from '@/components/Tdashboard/Tdashboard'

const Page = () => {
  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })
  
  return (
    <>
      {session?.user?.role == "Student" ? <Sdashboard /> :  <Tdashboard role={session?.user.role} id={status === "authenticated" ? session.user.id : null}/>}
    </>

  )
}

export default Page

