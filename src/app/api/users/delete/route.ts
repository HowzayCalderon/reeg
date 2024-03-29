import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(request: NextRequest, response: NextResponse){
    try{
        const searchParams = request.nextUrl.searchParams
        const getUserName: string | null = searchParams.get('username')
        const deleteUser = await prisma.user.delete({
            where: {
                username: getUserName as string
            }
        })
    return new Response("It has been done")

    }catch(e){

        return new Response("You failed")
    }
}

