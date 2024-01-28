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
      Protected Page
      <p>{session.user?.name}</p>
    </>

  )
}

export default page