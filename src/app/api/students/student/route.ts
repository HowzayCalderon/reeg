import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const getStudent: String | null = searchParams.get("id");
        const resOptions = {status: 200, statusText: "OK"};
        let resMessage: any;

        const findStudent = await prisma.student.findFirst({
            where:{ userId: getStudent as string},
            include:{ 
                Class:{
                    select: {
                        Teacher: true,
                        classname: true
                    }
                }
            }
        }).then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage, resOptions)
    }catch(e:any){
        return new Response("Failed");
    }
}

/* FUNCTION NEEDS TO BE TESTED WITH POSTMAN, ADD A FAKE CLASS AND TEACHER 
TO TEST IF DATABASE QUERY RETURNS WANTED INFORMATION..... 
ONCE THIS IS ALL FUNCTIONAL START TO ADD CLASSES TO FRONTEND DASHBOARD*/