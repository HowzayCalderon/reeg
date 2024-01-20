import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";

export const prisma = new PrismaClient()


export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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
                            name: credentials?.username
                        }
                    })
                    let match 
                    if(foundUser){
                        console.log("User Exists")
                        // match = await bcrypt.compare(credentials?.password as string, foundUser?.password)
                        match = foundUser.password == credentials?.password
                    };
                    if(match){
                        console.log("Good Pass")
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
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, user, token }){
            return session
        },
        async signIn({}){
            return true
        }
    }
}


// STILL NEED TO CREATE EMAIL VERIFICATION, CUSTOM SIGN IN FORM AND CREATE USER FORM, MAKE CREDENTIALS PROVIDER REDIRECT TO MAIN PAGE AFTER SIGN IN

// test user account email: Jose, password: test