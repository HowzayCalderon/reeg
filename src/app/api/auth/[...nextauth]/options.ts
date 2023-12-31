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
            name: "Email & Password",

            credentials: {
                email:{ label: 'Email', type: 'text', placeholder: 'johnDoe@example.com'},
                password:{ label: 'Password', type: 'password', placeholder: 'Password'}
            },

            async authorize(credentials){
                const getUser = await prisma.user.findUnique({
                    where: {
                        email:  credentials?.email
                    }
                })
                if(!getUser){
                    return null
                }
                return getUser
            },
            
        })
    ],  
    callbacks: {
        async signIn({user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if(isAllowedToSignIn){
                return true
            }else{
                return false
            }
        },

    }
}

/* write getUserFromDB function in Services file for credentials authorize function, 
refer to next-auth documentation if confused */

/*  FINISH WRITING CALL BACK FUNCTIONS, CONTINUE WATCHING CREDENTIALS TUTORIAL*/