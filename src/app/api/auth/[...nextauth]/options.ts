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
    session:{
        strategy: "database"
    },
    pages:{
        signIn: "/signin",
        newUser: "/newUser"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID as string,
            clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: "Username",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "johnDoe"
                },
                password: {
                    label: "Password",
                    type: "Password",
                    placeholder: "Enter Password"
                }
            },
            async authorize(credentials){
                try{
                    const foundUser = await prisma.user.findUnique({
                        where: {
                            username: credentials?.username
                        }
                    })
                    let match 

                    if(foundUser){
                        match = await bcrypt.compare(credentials?.password || '', foundUser.password)
                    };

                    if(match){
                        return foundUser
                    }
    
                    
                } catch(error){
                    console.log(error)
                }
                return null
            }
        })
    ],
    callbacks: {
        session({ session, user }){
            session.user.id = user.id
            session.user.username = user.username
            return session
        }
    }
}


