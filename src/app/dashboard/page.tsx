import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '@/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Sdashboard from '@/components/Sdashboard/Sdashboard'
import Tdashboard from '@/components/Tdashboard/Tdashboard'

const page = async () => {
  const session = await getServerSession(options)
  if(!session){
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  return (
    <>
      {session?.user?.role == "Student" ? <Sdashboard id={session.user.id} role={session.user.role} username={session.user.username}/> 
      : <Tdashboard/>}
    </>

  )
}

export default page

/*
  
  consider creating two different layout components to clean up dashboard
  code. one for teachers and students
 */