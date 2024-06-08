import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

export const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    events: {
        async signIn(message){
            console.log("is this a new user?",message.isNewUser, message.profile, message.user, message.account)
        }
    },
    session: {
        strategy: "jwt"
    },
    debug: true,
    pages:{
        signIn: "/",
        newUser: "/newUser"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID as string,
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({token, account}){
            token.id = account?.userId
            token.accessToken = account?.access_token
            const user = await prisma.user.findUnique({
                where: {email: token.email} as any,
                select: {
                    id: true,
                    role: true 
                }
            })
            token.role = user?.role 
            token.id = user?.id
            return token
        },
        async session({ session, token}){
            session.user.email = token.email
            session.user.name =  token.name
            session.user.role = token.role
            session.user.id = token.id
            return session
        },
    }
}


// CONSIDER REMOVING CREDENTIALS PROVIDER AND ADDING EMAIL SIGNIN INSTEAD

