import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../auth/[...nextauth]/options";

export async function POST(request: NextRequest, response: NextResponse){
    try{
        const resOptions = {status: 201, statusText: "Created"}
        const data = await request.json();
        const createStudent = await prisma.student.create({
            data: {
                user:{
                    connect: {
                        id: data.userId
                    }
                },
                gradelevel: data.gradelevel
            }
        })

        return new Response("Student Created", resOptions)
    }catch(err:any){
        const resOptions = {status: 400, statusText: "Bad Request"};
        let resMessage = "";
        console.error(err);
        return new Response(resMessage, resOptions);
    }
}