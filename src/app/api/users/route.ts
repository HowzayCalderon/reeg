import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export const prisma = new PrismaClient()


export async function GET(request: NextRequest, response: NextResponse){

    try{
        const searchParams = request.nextUrl.searchParams;
        const getEmail = searchParams.get('email')
        const getUser = await prisma.user.findUnique({
            where: {
                email: getEmail as string 
            }
        })
        return new Response(getUser?.email)
    }catch(e){
        console.error(e + ' this is the error message')
        return new Response("An error occured")

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
    return new Response("User created")
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

// Ensure each function has a proper response and is catching errors