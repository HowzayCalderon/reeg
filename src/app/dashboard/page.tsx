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
      <p> {session.user.role}</p>
      <p>{session.user.id}</p>
      <p>{session.user.email}</p>
    </>

  )
}

export default page

