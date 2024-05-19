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
        signIn: "/signin",
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
        async jwt({token, account, user}){
            token.id = account?.userId
            token.accessToken = account?.access_token
            token.role 
            if(account?.provider !== 'credentials'){
                const res = await fetch(`http://localhost:3000/api/users/user?email=${token.email}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("this is the data",data)
                    token.role = data.role
            })

            }
            return token
        },
        async session({ session, token}){
            session.user.email = token.email
            session.user.name =  token.name
            session.user.role = token.role
            return session
        },
    }
}


// CONSIDER REMOVING CREDENTIALS PROVIDER AND ADDING EMAIL SIGNIN INSTEAD