import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        if(data.role == "Teacher"){
            const updateTeacherRole = await prisma.user.update({
                where: {
                    email: data.email
                },
                data: {
                    role: data.role,
                    Teacher: {
                        create: {
                            
                        }
                    }
                }
            })
        }
        else if(data.role == "Student"){
            const updateStudentRole = await prisma.user.update({
                where: {
                    email: data.email
                },
                data: {
                    role: data.role,
                    Student: {
                            create: {
                                gradelevel: Number(data.gradeLevel)
                            }
                    }
                }
            })
        }
        return new Response("Success")
    }catch(e:any){
        console.log(e)
        return new Response("not success")
    }
}
