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

        const myOptions = {
            status: 200,
            statusText: "OK"
        }

        let bodyMessage: string | null = ''

        if(getUser == null){
            myOptions.status = 200,
            myOptions.statusText = "OK"
            bodyMessage = "User Does Not Exist"
        }else if(getUser !== null){
            bodyMessage = getUser.email
        }

        return new Response(bodyMessage, myOptions)
    }catch(e){

        const myOptions = {
            status: 400,
            statusText: "Bad Request"
        }
        let bodyMessage = "Must use proper syntax"
        
        return new Response(bodyMessage, myOptions)

    }
        

        
}

export async function POST(request: NextRequest, response: NextResponse){
    try{
    const data = await request.json()
    const createUser = await prisma.user.create({
        data:{
            email: data.email,
            name: data.name
        }
    })
    console.log(createUser)
        const myOptions = {
            status: 201,
            statText: "OK"
        }

    return new Response("User created", myOptions)
    }catch(e){
        return new Response("Error")

    }
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