import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../auth/[...nextauth]/options";

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

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const resOptions = { status: 200, statusText: "Success"}
        let resMessage: any;
        const getTeachers = await prisma.teacher.findMany(
        ).then((res) => {
            resMessage = JSON.stringify(res)
        })
        return new Response(resMessage, resOptions)
    }catch(e:any){

        return new Response("it failed");
    }
}
