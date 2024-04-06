import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '@/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'


const page = async () => {
  const session = await getServerSession(options)
  if(!session){
    redirect('/api/auth/signin?callbackUrl=/dashboard')
  }

  return (
    <>
      <p> Hello, {session.user?.username}</p>
      <p>{session.user.id}</p>
      <p>{session.user.role}</p>
      <h1 className='text-3xl pt-2'>Classes</h1>
      <h1 className='text-3xl pt-2'>Subjects</h1>
      {/* create links for all subjects, students will be able to 
      click on the desired subject and answer questions for it without
      needing to join a class */}
    </>

  )
}

export default page

/*
  consider creating two different layout components to clean up dashboard
  code. one for teachers and students
 */