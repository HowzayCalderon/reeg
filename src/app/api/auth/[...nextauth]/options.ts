import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username",
        //             type: "text",
        //             placeholder: "coolStudent22"
        //         },password: {
        //             label: "Password:",
        //             type: "password"
        //         }
        //     },
        //     async authorize(credentials, req) {
        //         let user = null; 
        //         return user;
        //     }
        // })
    ],
    
}

/* write getUserFromDB function in Services file for credentials authorize function, 
refer to next-auth documentation if confused */