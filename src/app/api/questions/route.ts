import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json() 
        const createQuestion = await prisma.question.create({
            data:{
                subject: {
                    connect:{
                        name: data.subject
                    }
                },
                difficulty: data.difficulty,
                topic: data.topic,
                que: data.que,
                optionOne: data.optionOne,
                optionTwo: data.optionTwo,
                optionThree: data.optionThree,
                optionFour: data.optionFour,
            }
        })
        const myOptions = {
            status: 201,
            statusText: "Created"
        }

        return new Response("Question added", myOptions)
    }catch(err: any){
        console.log(err)
        return new Response("You failed")
    }
}

export async function GET(request: NextRequest, response: NextResponse){
    try{
        let resMessage: any = ""
        const getQuestions = await prisma.question.findMany()
        .then((question) => {
            resMessage = JSON.stringify(question)
        })
        return new Response(resMessage)
    }catch(err:any){
        return new Response("You failed")
    }
}