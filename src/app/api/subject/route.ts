import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        const createSubject = await prisma.subject.create({
            data:{
                name: data.name,
            }
        })
        const myOptions = {
            status: 201,
            statusText: "Created"
        }
        return new Response("Subject Created", myOptions)
    } catch(err: any){
        
    }
}