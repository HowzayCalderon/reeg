import { NextRequest } from "next/server";
import { prisma } from "@/api/auth/[...nextauth]/options";

export async function GET(request: NextRequest){
    try{
        const searchParams = request.nextUrl.searchParams;
        const getSubject = searchParams.get("subject")
        const resOptions = {status: 200, statusText: "OK"};
        let resMessage: any = ""
        const findQuestions = await prisma.subject.findMany({
            where:{ name: getSubject as string },
            include:{
                questions: true
            }
            
        })
        .then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage, resOptions)
    }catch(e: any){
        let resMessage = JSON.stringify(e)
        return new Response(resMessage);
    }
}