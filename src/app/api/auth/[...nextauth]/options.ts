import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

export const prisma = new PrismaClient()


export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
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
                            email: credentials?.username
                        }
                    })
                    let match = null
                    if(foundUser){
                        console.log("User Exists")
                        match = await bcrypt.compare(credentials?.password as string, foundUser?.password)
                    };
                    if(match){
                        console.log("Good Pass")
                    }
    
                    
                } catch(error){
                    console.log(error)
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({token}){
            return token
        },
        async session({session, user, token }){
            return session
        }
    }
}


// STILL NEED TO CREATE EMAIL VERIFICATION, CUSTOM SIGN IN FORM AND CREATE USER FORM, NEED TO TEST CREDENTIALS PROVIDER SIGN IN