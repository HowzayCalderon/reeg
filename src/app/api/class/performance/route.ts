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
                            select: {
                                topic: true,
                                percentage: true
                            }
                            // include: {
                            //     topic: {
                            //         select: {
                            //             name: true
                            //         }
                            //     }
                            // }
                        }
                    }
                }
            }
        }).then((data) => {
            // let performances:boolean = true;
            // // data?.students[0].performance
            // // use while loop, each object has a # index, place a property inside performances to signal a stop for while loop
            // let count:number=0
            // let top:string|undefined;
            // while(performances){
            //     console.log('1st');
            //     if(data?.students[0].performance[count]){
            //         console.log('2nd')
            //         if(data?.students[0].performance[count].percentage! < 60){
            //             console.log('3rd');
            //             top = data?.students[0].performance[count].topic.name
            //             console.log(top)
            //             count++
            //             continue;
            //         }
            //     }
            //     return;
            // }
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage)
        
    } catch (error:any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response("failed", resOptions)
    }

}