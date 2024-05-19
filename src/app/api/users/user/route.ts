import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const searchParams = req.nextUrl.searchParams;
        const getUserName: string | null = searchParams.get('username');
        const getEmail: string | null = searchParams.get('email')
        const resOptions = { status: 200, statusText: "OK"};
        let resMessage: any = "";

            if(getUserName){
                const getUser = await prisma.user.findUnique({
                    where: {
                        username: getUserName as string 
                    }
                }).then((user) => {
                    resMessage = JSON.stringify(user)
                })
                return new Response(resMessage, resOptions)
            }else{
                const getEmailUser = await prisma.user.findUnique({
                    where: {
                        email: getEmail as string
                    }
                }).then((user) => {
                    resMessage = JSON.stringify(user)
                })
                return new Response(resMessage, resOptions)
            }
        
    }catch(err: any){

        const myOptions = {status: err.statusCode, statusText: "Bad Request"}
        let resMessage = err.message;
        console.error(err.message);
        console.error(err.name);
        console.error(err.stack);
        
        return new Response(resMessage, myOptions)

    }
        
}
