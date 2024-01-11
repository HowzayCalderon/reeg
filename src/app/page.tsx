'use client'

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface Props {
  session: Session | null
}

export default function Home() {
    <SessionProvider>
      
    </SessionProvider>
   
  }
