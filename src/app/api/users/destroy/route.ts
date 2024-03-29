import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, response: NextResponse){
    try{
    const deleteAllUsers = await prisma.user.deleteMany()

    return new Response("its done")

    }catch(e){

        return new Response("You failed")
    }
}
