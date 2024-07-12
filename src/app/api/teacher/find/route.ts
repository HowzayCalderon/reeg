import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse){
    try{
        const resOptions = { status: 200, statusText: "Success"}
        let resMessage: any;
        const getTeachers = await prisma.teacher.findMany(
        ).then((res) => {
            resMessage = JSON.stringify(res)
        })
        return new Response(resMessage, resOptions)
    }catch(e:any){

        return new Response("it failed");
    }
}