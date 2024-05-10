import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest){
    try {
        const resOptions = {status: 201, statusText: "Updated"}
        const data = await request.json();
        const searchParams = request.nextUrl.searchParams
        const getId: any = searchParams.get('id')
        const addAnswers = await prisma.student.update({
            where: { userId: getId},
            data: {
                answers: {
                    createMany: {
                        data: data
                    }
                },
            }
        })
        
        return new Response("Success",resOptions)
    } catch (error: any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response('failed', resOptions)
    }
}