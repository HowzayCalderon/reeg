import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    try{
        const searchParams = request.nextUrl.searchParams;
        const getId = searchParams.get("id")
        const resOptions = {status: 200, statusText: "OK"};
        let resMessage: any = ""
        const findStudent = await prisma.student.findFirst({
            where:{ userId: getId as string },
            include:{ 
                Class:{
                    select: {
                        id: true,
                        Teacher: true,
                        classname: true,
                        students: true,
                        topic: true
                    }
                }
            }
        })
        .then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage, resOptions)
    }catch(e: any){

        return new Response("Failed");
    }
}

/*
    **** UPDATE **** STUDENT GET() METHOD NOW RETURNS CLASS INFORMATION
    AND THERE IS CURRENTLY ONE CLASS, ONE TEACHER, AND ONE STUDENT AND
    THEY ARE ALL CONNECTED. 

    NOW READY TO CREATE DASHBOARD CLASS LINKS FOR EACH INDIVIDUAL 
    CLASS A STUDENT IS IN. NEED TO SHIFT FOCUS TOWARDS CREATING 
    THE QUIZ SECTION TO ACHIEVE MVP FASTER. ABILITY TO CREATE 
    QUIZZES IS MAIN PRIORITY
*/
