import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextResponse, req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const getUserName: string | null = searchParams.get('username');
        const resOptions = { status: 200, statusText: "OK"};
        let resMessage: any = "";


            const getUser = await prisma.user.findUnique({
                where: {
                    username: getUserName as string 
                }
            }).then((user) => {
                resMessage = JSON.stringify(user)
            })
            return new Response(resMessage, resOptions)
        
    }catch(err: any){

        const myOptions = {status: err.statusCode, statusText: "Bad Request"}
        let resMessage = err.message;
        console.error(err.message);
        console.error(err.name);
        console.error(err.stack);
        
        return new Response(resMessage, myOptions)

    }
        
}
