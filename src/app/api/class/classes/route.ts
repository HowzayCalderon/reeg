import { prisma } from "@/api/auth/[...nextauth]/options";

export async function GET(){
    try{
        let resMessage: any;
        const resOptions = { status: 200, statusText: 'OK'};
        const getClasses = await prisma.class.findMany()
        .then((data) => {
            resMessage = JSON.stringify(data)
        })
        return new Response(resMessage, resOptions)

    }catch(e: any){
        return new Response("failed");
    }
}