'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

interface classInformation {
  id: number,
  classname: string, 
  teacherId: number,
  topicId: number, 
  students: []
}

function page({params}: {params: {class: string}}) {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })

const [classInfo, setClassInfo] = useState<[classInformation]| void>()

useEffect(()=>{
  fetch(`http://localhost:3000/api/class/class?name=${params.class}&id=${session?.user?.id}`)
  .then((res) => {res.json()})
  .then((ponse)=> {
    console.log(ponse);
    setClassInfo(ponse);
  })
},[])
  return (
    <div>
      {params.class}
      hello
    </div>
  )
}

export default page