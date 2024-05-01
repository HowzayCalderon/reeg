import { prisma } from "@/api/auth/[...nextauth]/options"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const myOptions = {status: 201, statusText: "Created"}
        const data = await request.json() 
        const createQuestion = await prisma.question.create({
            data:{
                subject: {
                    connect: {
                        name: data.subject
                    }
                },
                difficulty: data.difficulty,
                topic: {
                    connectOrCreate: {
                        create:{name: data.topic, subject: { connect:{name: data.subject}} },
                        where: {
                            name: data.topic
                        }
                    }
                },
                que: data.que,
                optionOne: data.optionOne,
                optionTwo: data.optionTwo,
                optionThree: data.optionThree,
                optionFour: data.optionFour,
                corrAnswer: data.corrAnswer
            }
        })

        return new Response("Question added", myOptions)
    }catch(err: any){
        let resMessage = ""
        let resOptions = {status: 400, statusText: "Bad Request"}
        if(err instanceof PrismaClientValidationError){
            console.error("Missing field", err.message)
            resMessage = "Missing field or Improper Value"
        }
        if(err instanceof PrismaClientKnownRequestError){
            console.error(err.message)
        }
        return new Response(resMessage, resOptions)
    }
}
