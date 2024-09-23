import { prisma } from "@/api/auth/[...nextauth]/options";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const classId:URLSearchParams|string|null = searchParams.get('classId')
        let resMessage:any = {}
        const performance = await prisma.class.findUnique({
            where: {
                id: Number(classId)
            }, include: {
                students: {
                    select: {
                        performance: {
                            include: {
                                topic: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }).then((data) => {
            // console.log(data?.students[0].performance)
            let performances:undefined|{} = data?.students[0].performance
            let results:{};
            for(const key in performances){
                
            }
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage)
        
    } catch (error:any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response("failed", resOptions)
    }

}