import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const classId:URLSearchParams|string|null = searchParams.get('classId')
        let resMessage:{} ={}
        const performance = await prisma.topicPerformance.findMany({
            where: {
                student: {classId: Number(classId)}
            }
        }).then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response("Success",resMessage)
        
    } catch (error:any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response("failed", resOptions)
    }

}