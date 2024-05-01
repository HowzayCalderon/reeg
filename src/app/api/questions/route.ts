import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";



export async function DELETE(request: NextRequest, response: NextResponse){
    try{
        const deleteQuestions = await prisma.question.deleteMany()
        return new Response("Questions Deleted")
    }catch(err:any){
        return new Response("Questions are still there")
    }
}