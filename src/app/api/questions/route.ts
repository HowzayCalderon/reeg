import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const myOptions = {status: 201, statusText: "Created"}
        const data = await request.json() 
        const createQuestion = await prisma.question.create({
            data:{
                subject: {
                    connect:{
                        name: data.subject.toLowerCase()
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

        return new Response("Question added", myOptions)
    }catch(err: any){
        let resMessage = ""
        let resOptions = {status: 400, statusText: "Bad Request"}
        if(err instanceof PrismaClientValidationError){
            console.error("Missing field",err.message)
            resMessage = "Missing field or Improper Type"
            resOptions.status = 400
            resOptions.statusText = "Bad Request"
        }
        return new Response(resMessage, resOptions)
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