import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        const updateUser = await prisma.user.update({
            where: {
                email: data.email 
            },
            data: {
                role: data.role,
                username: data.username,
                Teacher: {
                    
                }
            }
        })
        return new Response("its done");
    }catch(e){
        return new Response("it failed")
    }
}

