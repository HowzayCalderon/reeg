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
    <nav className='p-1 bg-white rounded h-full w-full'>
      <div>
        { session ? <Link href={'/dashboard'}>Reeg.</Link> : <Link href={'/'}>Reeg.</Link>}
        <ul className='flex'>
          <li>
            {session ? <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link> :  null}
          </li>
      </ul>

      </div>
    </nav>
  )
}

export default Nav