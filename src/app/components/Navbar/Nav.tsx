'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { options } from '@/api/auth/[...nextauth]/options'
import { usePathname } from 'next/navigation'
import List from '../List/List'
import { classContext } from '../../../context'
import { useContext } from 'react'

interface classData {
  classname: string,
  id: number,
  students: {}[],
  teacherId: number,
  topicId: number
}
function Nav() {
  const {data: session } = useSession()
  const pathname = usePathname()
  const classes = useContext(classContext)
  return (
    <nav className='p-1 bg-white rounded h-full w-full'>
      <div className='h-full'>
        <aside className='mb-4'>
          { session ? <Link href={'/dashboard'}>Reeg.</Link> : <Link href={'/'}>Reeg.</Link>}
        </aside>
        <List data={classes}/>
        <div className=''>
          {session ? <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link> :  null}
        </div>
      </div>
    </nav>
  )
}

export default Nav