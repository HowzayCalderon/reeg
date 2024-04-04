import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest){
    try{
        const info = await request.json()
        const addStudent = await prisma.class.update({
            where: {
                id: info.classid
            },
            data: {
                students: {
                    connect: {
                        id: info.studentid
                    }
                }
            }
        })
        return new Response("its done")
    }catch(e:any){
        return new Response('it failed');
    }
}
