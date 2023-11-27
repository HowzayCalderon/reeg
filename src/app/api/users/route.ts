import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, response: NextResponse){
    const headerslist = request.headers
    let email = headerslist.get('email') || ''

    async function getUser(){
        const user: string = await prisma.user.findUnique({
            where: {
                'email': email
            }
        }).then(() => {
            if(user){
                return user;
            }else{
                return 'User not found'
            }
        })
        
    }
    getUser()
    .then(async () => {
        await prisma.$disconnect()
    }).catch( async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1);
    })
    return response.body
}

// figure out how to extract username from request and insert it into getUser function