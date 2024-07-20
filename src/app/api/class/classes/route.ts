import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    try{
        let resMessage: any;
        const resOptions = { status: 200, statusText: 'OK'};
        const searchParams = request.nextUrl.searchParams
        const getTeacherId:any = searchParams.get('id');
        const getClasses = await prisma.class.findMany({
            where: {
                Teacher: {
                    user: {
                        id: getTeacherId
                    }
                }
            }, include: {
                students: {
                    include: {
                        performance: true
                    }
                }
            }
        })
        .then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage, resOptions)

    }catch(e: any){
        return new Response("failed");
    }
}