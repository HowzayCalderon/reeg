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
        return new Response("You failed");
    }
}

export async function GET(request: NextRequest, response: NextResponse){
    try{
        let resMessage: any;
        const getSubject = await prisma.subject.findMany()
        .then((subject) => {
            resMessage = JSON.stringify(subject)
        })

        return new Response(resMessage)
    } catch(err: any){
        return new Response("Fail")
    }
}

export async function DELETE(request: NextRequest, response: NextResponse){
    try{
        let resMessage: any = "Subject Deleted"
        const data = await request.json()
        const deleteSubject = await prisma.subject.delete({
            where: {
                name: data.name
            }
        })

        return new Response(resMessage)
    } catch(err: any){
        console.error(err)
        return new Response("Fail")
    }
}


/* REMEMBER TO CHANGE GETSUBJECT FILTER TO SEARCH FOR THE 
REQUESTED SUBJECT AND NOT FOR ALGEBRA All of them */