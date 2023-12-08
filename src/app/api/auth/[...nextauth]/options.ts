import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "johndoe@email.com"
                },password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials, req) {
                let user = null; 
                return user;
            }
        })
    ],
    
}

/* write getUserFromDB function in Services file for credentials authorize function, 
refer to next-auth documentation if confused */