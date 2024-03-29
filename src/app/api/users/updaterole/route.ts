import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        const updateRole = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                role: data.role,
                username: data.username,
                Teacher: {
                    connectOrCreate: {
                        where: {
                            userId: data.id,
                        },
                        create:{

                        }
                    }
                }
            }
        })
        return new Response("Success")
    }catch(e:any){
        console.log(e)
        return new Response("not success")
    }
}
