import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const resOptions = {status: 201, statusText: "Created"}
        const data = await request.json();
        const addAnswers = await prisma.student.update({
            where: { id: data.studentId},
            data: {
                answers: {
                    createMany: {
                        data: [{
                            questionId: data.questionId,
                            userAnswer: data.answer,
                            isCorrect: data.isCorrect}]
                    }
                }
            }
        })
        return new Response("Success",resOptions)
    } catch (error: any) {
        console.log(error)
        return new Response('failed')
    }
}