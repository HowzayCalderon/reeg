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
    </>

  )
}

export default page

