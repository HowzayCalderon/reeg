import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse){
    try{
        const searchParams = req.nextUrl.searchParams
        const teacherId = searchParams.get('id')
        const resOptions = { status: 200, statusText: "Success"}
        let resMessage: any;
        const getTeachers = await prisma.teacher.findUnique({
            where: {
                userId: teacherId as string 
            }, 
            include: {
                classlist: true
            }
        }).then((res) => {
            resMessage = JSON.stringify(res)
        })
        return new Response(resMessage, resOptions)
    }catch(e:any){
        console.log(e)
        return new Response(e);
    }
}