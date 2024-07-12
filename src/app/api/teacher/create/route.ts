import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/api/auth/[...nextauth]/options";

export async function POST( request: NextRequest, response: NextResponse){
    try{
        const resOptions = {status: 201, statusText: "Created"}
        const data = await request.json()
        const createTeacher = await prisma.teacher.create({
            data: {
                user: {
                    connect:{  id: data.id  }
                    // this method not working
                }
            }
        })
        return new Response("Teacher created", resOptions)
    }catch(e:any){
        console.error(e)
        return new Response("You failed");
    }
}