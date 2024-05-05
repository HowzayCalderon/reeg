import { prisma } from "@/api/auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        if(data.role == "Teacher"){
            const updateTeacherRole = await prisma.user.update({
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
        }
        else if(data.role == "Student"){
            const updateStudentRole = await prisma.user.update({
                where: {
                    id: data.id
                },
                data: {
                    role: data.role,
                    Student: {
                        connectOrCreate: {
                            where: {
                                userId: data.id
                            },
                            create: {
                                gradelevel: data.gradeLevel 
                            }
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
