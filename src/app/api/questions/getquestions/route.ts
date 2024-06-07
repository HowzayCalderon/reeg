import { prisma } from "@/api/auth/[...nextauth]/options"
import { get } from "http";
import { NextRequest } from "next/server"

export async function GET(request: NextRequest){
    try{
        let resMessage: any = ""
        let resOptions = {status: 200, statusText: "OK"}
        const searchParams = request.nextUrl.searchParams;
        const getSubject = searchParams.get('name')
        const getStudent = searchParams.get('user')
        let checkPromise = false
        const getPerformance:any = await prisma.topicPerformance.findMany({
            where: {
                student: {
                    userId: getStudent as string 
                },
                topic: {
                    subject: {
                        name: getSubject as string 
                    }
                }
            },
            select:{
                topic: {
                    select: {
                        name: true 
                    }
                },
                percentage: true 
            }
            
        }).then(() => {checkPromise = true})

        let topicCount = 3
        let questionTopics = []
        if(checkPromise && getPerformance){
            console.log('the performance:',getPerformance)
            for(let x=0; topicCount > 0; x++){
                if(getPerformance[x].percentage < 50){
                    questionTopics.push(getPerformance[x].topic.name)
                    topicCount--
                }
            }
            const getQuestions = await prisma.question.findMany({
                where: {
                    subject: {
                        name: getSubject as string,
                    },
                    answer: {
                        none: {
                            student: {
                                userId: getStudent as string
                            }
                        }
                    },
                    topic: {
                        name: {
                            in: questionTopics
                        }
                    }
                },include: {
                    topic: {
                        select: {
                            id: true,
                            performances: {
                                where: {
                                    student: {
                                        userId: getStudent as string 
                                    }
                                }
                            }
                        }
                    },
                    
                },
                take: 10
                
            })
            .then((question) => {
                resMessage = JSON.stringify(question)
            })

        }else{
            const getQuestions = await prisma.question.findMany({
                where: {
                    subject: {
                        name: getSubject as string
                    },
                    answer: {
                        none: {
                            student: {
                                userId: getStudent as string
                            }
                        }
                    }
                },
                take: 10
            }).then((data) => {
                resMessage = JSON.stringify(data)
            } )
        }
        
        
        return new Response(resMessage, resOptions)
    }catch(err:any){
        console.log(err)
        return new Response("You failed")
    }
}



/*  
    WRITE LOGIC FOR WHEN A USER HAS NO PRIOR TOPIC PERFORMANCE, 
    EXAM SHOULD RETURN A QUIZ WITH A MIXTURE OF AS MANY TOPICS AS POSSIBLE
*/