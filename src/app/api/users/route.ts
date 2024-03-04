import { prisma } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server";
import { validationError } from "../../lib/errors";
import { hash } from "bcrypt";





export async function GET(request: NextRequest, response: NextResponse){

    try{
        const searchParams = request.nextUrl.searchParams;
        const getUserName: string | null = searchParams.get('username');
        const resOptions = { status: 200, statusText: "OK"};
        let resMessage: any = "";

        if(getUserName !== null){
            const getUser = await prisma.user.findUnique({
                where: {
                    name: getUserName as string 
                }
            }).then((user) => {
                resMessage = JSON.stringify(user)
            })
            return new Response(resMessage, resOptions)

        }
        else if(getUserName == null){

            throw new validationError("Missing Field or Improper Syntax", 400)
        }

    }catch(err: any){

        const myOptions = {status: err.statusCode, statusText: "Bad Request"}
        let resMessage = err.message;
        console.error(err.message);
        console.error(err.name);
        console.error(err.stack);
        
        return new Response(resMessage, myOptions)

    }
        

        
}

export async function POST(request: NextRequest, response: NextResponse){
    try{
    const data = await request.json()
    const hashedPassword = await hash(data.password, 12)
    const createUser = await prisma.user.create({
        data:{
            name: data.name.toLowerCase(),
            password: hashedPassword
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
        const getUserName: string | null = searchParams.get('username')
        const deleteUser = await prisma.user.delete({
            where: {
                name: getUserName as string
            }
        })
    return new Response("It has been done")

    }catch(e){

        return new Response("You failed")
    }
}

// Ensure each function has a proper response and is catching errors