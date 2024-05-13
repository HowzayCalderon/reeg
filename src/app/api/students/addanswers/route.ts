import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest){
    try {
        const resOptions = {status: 201, statusText: "Updated"}
        const data = await request.json();
        const searchParams = request.nextUrl.searchParams
        const getId: any = searchParams.get('id')
        // const performanceData = data.reduce((acc:[{}], curr: any) => {
        //     const { topicId, isCorrect } = curr
        //     const wins = {increment: 1}
        //     const attempts = {increment: 1}
        //     if(isCorrect){
        //         wins.increment = 1
        //     }else{
        //         wins.increment = 0
        //     }
        //     const newObject = {topicId, attempts, wins}

        //     acc.push(newObject)
        //     return acc;
        // },[])

// ************************************************************
        const addAnswers = await prisma.student.update({
            where: { userId: getId},
            data: {
                answers: {
                    create: {
                        questionId: data.questionId,
                        userAnswer: data.userAnswer,
                        isCorrect: data.isCorrect
                    }
                },
                performance: {
                    upsert: {
                        where: {topicId: data.topicId},
                        update: {
                            attempts: {increment: 1},
                            wins: data.isCorrect ? {increment: 1} : {increment: 0}
                        },
                        create: {
                            topicId: data.topicId,
                            attempts: 1,
                            wins: data.isCorrect ? 1 : 0
                        }
                    }
                }
            }   
            
        })

// *************************************************************
        // function logAnswers(id: string){
        //     return prisma.$transaction(async (tx) => {
        //         const getPerformance = await tx.topicPerformance.findFirst({
        //             where: { topicId: data.topicId, student: {userId: id}}
        //         })

        //         const addAnswers = await tx.student.update({
        //             where: { userId: id},
        //             data: {
        //                 performance: data.id
        //             }

        //         })
        //     })
        // }
        
        
        return new Response("Success",resOptions)
    } catch (error: any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response('failed', resOptions)
    }
}