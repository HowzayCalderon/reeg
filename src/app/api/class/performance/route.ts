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
                            
                        }
                    }
                }
            }
        }).then((data) => {
            const ref = data?.students[0].performance
            let myMap = new Map<string, number>()
            // stores results
            let arr:{}[]= [];
            // removes any topic above 60% 
            for(let x=0; x<ref?.length!; x++){
                if(data?.students[0].performance[x].percentage! > 60){
                    continue
                }
                else if(!myMap.has(data?.students[0].performance[x].topic.name!)){
                    myMap.set(data?.students[0].performance[x].topic.name!, 1)
                }else{
                    myMap.set(data?.students[0].performance[x].topic.name!, myMap.get(data?.students[0].performance[x].topic.name!)! + 1)
                }
            }
            
            myMap.forEach((item,key) =>{
                arr.push({key,item})
            })
            
            resMessage = JSON.stringify(arr)
        })
        return new Response(resMessage)
        
    } catch (error:any) {
        const resOptions = {status: 400, statusText: 'failed'}
        console.log(error)
        return new Response("failed", resOptions)
    }

}