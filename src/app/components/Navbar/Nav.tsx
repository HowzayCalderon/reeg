'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { options } from '@/api/auth/[...nextauth]/options'
import { usePathname } from 'next/navigation'


function Nav() {
  const {data: session } = useSession()
  const pathname = usePathname()
  return (
    <nav className='flex justify-between p-1 border-black border-2'>
      { session ? <Link href={'/dashboard'}>Reeg.</Link> : <Link href={'/'}>Reeg.</Link>}
      <ul className='flex'>
        <li>
          {session ? <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link> :  <Link href={'/signin'}>Sign In</Link>}
        </li>
      </ul>
    </nav>
  )
}

export default Nav