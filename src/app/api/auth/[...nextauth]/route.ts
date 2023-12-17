import NextAuth from "next-auth";
import { options } from './options'
import { Auth } from '@auth/core'
import Tiktok from '@auth/core/providers/tiktok'

const handler = NextAuth(options)


export { handler as GET, handler as POST}