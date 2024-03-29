import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"



export async function POST(request: NextRequest, response: NextResponse){
    try{
    const data = await request.json()
    const hashedPassword = await hash(data.password, 12)
    const createUser = await prisma.user.create({
        data:{
            username: data.name.toLowerCase(),
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