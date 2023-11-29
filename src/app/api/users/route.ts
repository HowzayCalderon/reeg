import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const prisma = new PrismaClient()


export async function GET(request: NextRequest, response: NextResponse){

        const searchParams = request.nextUrl.searchParams
        const emailname = searchParams.get('email')
        const getUser = await prisma.user.findUnique({
            where: {
                email: emailname as string 
            }
        })
        
        console.log(getUser)
    if(getUser){
        return new Response("User Exists")
    }else{
        return new Response("User does not exist")
    }
}

export async function POST(request: NextRequest, response: NextResponse){
    
    const data = await request.json()
    const createUser = await prisma.user.create({
        data:{
            email: data.email,
            name: data.name
        }
    })
    return response.blob
}

export async function DELETE(request: NextRequest, response: NextResponse){
    const searchParams = request.nextUrl.searchParams
    const emailname = searchParams.get('email')
    const deleteUser = await prisma.user.delete({
        where: {
            email: emailname as string
        }
    })
    return new Response("It has been done")
}

// figure out how to extract username from request and insert it into getUser function