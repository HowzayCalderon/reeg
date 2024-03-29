import { prisma } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: Response, req: Request){
    try{
        const resOptions = { status: 200, statusText: "Success"}
        let resMessage: any = "";
        const getUsers = await prisma.user.findMany(
        ).then((res) => {
            resMessage = JSON.stringify(res)
        })
        return new Response(resMessage, resOptions)
    }catch(e:any){
        return new Response("it failed");
    }
}



















