import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const myOptions = {status: 201, statusText: "Created"}
        const data = await request.json()
        const createAnswer = await prisma.answer.create({
            data:{
                question: {
                    connect: {
                        que: data.question
                    }
                },
                userAnswer: data.userAnswer,
                student: {
                    connect: {
                        id: data.studentId
                    }
                },
                isCorrect: data.isCorrect
            }
        })

        return new Response("Answer Created", myOptions)
    }catch(err: any){
        let resMessage = ""
        const resOptions = {status: 400, statusText: "Bad Request"}
        return new Response(resMessage, resOptions)
    }
}