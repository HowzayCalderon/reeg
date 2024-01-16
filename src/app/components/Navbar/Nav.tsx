import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { options } from '@/api/auth/[...nextauth]/options'


async function Nav() {
  const session = await getServerSession(options)
  return (
    <nav className='flex justify-between p-1 border-black border-2'>
      { session ? <Link href={'/dashboard'}>Reeg.</Link> : <Link href={'/'}>Reeg.</Link>}
      <ul className='flex'>
        <li>
          {session ? <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link> : <Link href={'api/auth/signin?callbackUrl=/dashboard'}>Sign In</Link>}
        </li>
      </ul>
    </nav>
  )
}

export default Nav