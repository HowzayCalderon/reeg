'use client'
import React, { useContext, createContext } from 'react';
import Nav from '@/components/Navbar/Nav';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Histogram from '@/components/Histogram/Histogram';
import { performanceContext } from '../../../../../context';

interface classInformation {
  id: number,
  classname: string, 
  teacherId: number,
  topicId: number, 
  students: []
}

function Page({params}: {params: {class: string}}) {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/')
    }
  })

  const [classInfo, setClassInfo] = useState<classInformation| void>();
  const [authCheck, setAuthCheck] = useState<boolean>(false);
  const [performance, setPerformance] = useState<{}>()

  if(session?.user.id !== undefined && authCheck == false){
    setAuthCheck(true)
  }
useEffect(()=>{
  fetch(`http://localhost:3000/api/class/class?name=${params.class}&id=${session?.user?.id}`)
  .then((res) => res.json())
  .then((ponse)=> {
    console.log(ponse)
    setClassInfo(ponse);
  })

},[authCheck])

useEffect(()=>{
  if(classInfo){
    fetch(`http://localhost:3000/api/class/performance?classId=${classInfo?.id}`)
    .then((res)=> res.json())
    .then((res)=>{
      console.log(res);
      setPerformance(res);
    })
  }
},[classInfo])


  return (
    <div className='h-full grid grid-cols-5 grid-rows-4 gap-0.5 my-1'>
      <section className='row-span-4'>
        <Nav listOff={true}/>
      </section>
      {params.class}
      <performanceContext.Provider value={performance}>
        <section className='col-[2_/span_5] row-start-2 row-span-full bg-white h-fit'>
          <Histogram/>
        </section>
      </performanceContext.Provider>
    </div>
  )
}

export default Page

