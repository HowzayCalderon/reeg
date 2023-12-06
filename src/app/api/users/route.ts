import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export const prisma = new PrismaClient()


export async function GET(request: NextRequest, response: NextResponse){

    try{
        const searchParams = request.nextUrl.searchParams;
        const getEmail: string | null = searchParams.get('email');
        const resOptions = { status: 200, statusText: "OK"};
        let resMessage: string = "";

        if(getEmail !== null){
            const getUser = await prisma.user.findUnique({
                where: {
                    email: getEmail as string 
                }
            })
            resMessage = "User Exists"

            return new Response(resMessage, resOptions)

        }else if(getEmail == null){

            throw new Error("Insert error stuff here")
        }
        // if(getUser == null){
        //     myOptions.status = 200,
        //     myOptions.statusText = "OK"
        //     bodyMessage = "User Does Not Exist"
        // }else if(getUser !== null){
        //     bodyMessage = getUser.email
        // }

        // return new Response(bodyMessage, myOptions)
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
        const myOptions = {
            status: 201,
            statusText: "Created"
        }

    return new Response("User created", myOptions)

    }catch(e){
        const myOptions = {
            status: 400,
            statusText: "Bad Request"
        }
        let resBody = ""

        if(e instanceof SyntaxError){
            resBody = "Improper Syntax"
        }

        return new Response(resBody, myOptions)

    }
}

// ****** Write conditionals for if a field is missing or wrong format in try block ******

export async function DELETE(request: NextRequest, response: NextResponse){
    try{
        const searchParams = request.nextUrl.searchParams
        const getEmail: string | null = searchParams.get('email')
        const deleteUser = await prisma.user.delete({
            where: {
                email: getEmail as string
            }
        })
    return new Response("It has been done")

    }catch(e){

        return new Response("You failed")
    }
}

// Ensure each function has a proper response and is catching errors