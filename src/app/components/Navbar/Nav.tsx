'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import List from '../List/List'
import { classContext } from '../../../context'
import { useContext, useState } from 'react'
import { usePathname } from 'next/navigation'


function Nav({listOff}:{listOff: boolean}) {
  const {data: session } = useSession()
  const [removeList, setRemoveList] = useState<boolean>(listOff);
  const classes = useContext(classContext)

  return (
    <nav className='p-1 bg-white rounded h-full w-full'>
      <div className='h-full'>
        <aside className='mb-4'>
          { session ? <Link href={'/dashboard'}>Reeg.</Link> : <Link href={'/'}>Reeg.</Link>}
        </aside>
       {removeList ? null : <List data={classes}/>} 
        <div className=''>
          {session ? <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link> :  null}
        </div>
      </div>
    </nav>
  )
}

export default Nav