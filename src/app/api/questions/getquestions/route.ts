import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest){
    try{
        let resMessage: any = ""
        let resOptions = {status: 200, statusText: "OK"}
        const searchParams = request.nextUrl.searchParams;
        const getSubject = Number(searchParams.get('id'))
        const getQuestions = await prisma.question.findMany({
            where: {
                subjectId: getSubject
            }
        })
        .then((question) => {
            resMessage = JSON.stringify(question)
        })
        return new Response(resMessage, resOptions)
    }catch(err:any){
        return new Response("You failed")
    }
}