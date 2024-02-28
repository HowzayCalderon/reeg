import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json() 
        const createQuestion = await prisma.question.create({
            data:{
                subject: data.subject,
                difficulty: data.diff,
                topic: data.topic,
                optionOne: data.optionOne,
                optionTwo: data.optionTwo,
                optionThree: data.optionThree,
                optionFour: data.optionFour,
                answer: data.answer
            }
        })
        const myOptions = {
            status: 201,
            statusText: "Created"
        }

        return new Response("Question added", myOptions)
    }catch(err: any){

    }
}