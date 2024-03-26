import { prisma } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server";
import { validationError } from "../../lib/errors";
import { hash } from "bcrypt";





export async function GET(request: NextRequest, response: NextResponse){

    try{
        const searchParams = request.nextUrl.searchParams;
        const getUserName: string | null = searchParams.get('username');
        const resOptions = { status: 200, statusText: "OK"};
        let resMessage: any = "";


            const getUser = await prisma.user.findUnique({
                where: {
                    username: getUserName as string 
                }
            }).then((user) => {
                resMessage = JSON.stringify(user)
            })
            return new Response(resMessage, resOptions)
        
    }catch(err: any){

        const myOptions = {status: err.statusCode, statusText: "Bad Request"}
        let resMessage = err.message;
        console.error(err.message);
        console.error(err.name);
        console.error(err.stack);
        
        return new Response(resMessage, myOptions)

    }
        

        
}

export async function POST(request: NextRequest, response: NextResponse){
    try{
    const data = await request.json()
    const hashedPassword = await hash(data.password, 12)
    const createUser = await prisma.user.create({
        data:{
            username: data.name.toLowerCase(),
            password: hashedPassword
        }
    })
        const myOptions = {
            status: 201,
            statusText: "Created"
        }

    return new Response("User created", myOptions)

    }catch(e){
        const myOptions = {
            status: 400,
            statusText: "Bad Request"
        }
        let resBody = ""

        if(e instanceof SyntaxError){
            resBody = "Improper Syntax"
        }

        return new Response(resBody, myOptions)

    }
}

// ****** Write conditionals for if a field is missing or wrong format in try block ******

export async function DELETE(request: NextRequest, response: NextResponse){
    try{
    //     const searchParams = request.nextUrl.searchParams
    //     const getUserName: string | null = searchParams.get('username')
    //     const deleteUser = await prisma.user.delete({
    //         where: {
    //             username: getUserName as string
    //         }
    //     })
    // return new Response("It has been done")
    const deleteAllUsers = await prisma.user.deleteMany()
    return new Response("its done")

    }catch(e){

        return new Response("You failed")
    }
}

/* THE COMMENTED OUT CODE INSIDE THE DELETE FUNCTION IS THE PROPER CODE 
DONT FORGET TO UNCOMMENT IT BACK IN WHEN DONE TESTING THE NEW PAGE */

// export async function PATCH(request: NextRequest, response: NextResponse){
//     try{
//         const data = await request.json()
//         const updateUser = await prisma.user.update({
//             where: {
//                 email: data.email 
//             },
//             data: {
//                 role: data.role,
//                 username: data.username,
//                 Teacher: {
                    
//                 }
//             }
//         })
//         return new Response("its done");
//     }catch(e){
//         return new Response("it failed")
//     }
// }

//  ^^^ BOTH PATCH FUNCTIONS WORK BUT ARE TOO SPECIFIC, BOTTOM ONE CREATES TEACHERS

export async function PATCH(request: NextRequest, response: NextResponse){
    try{
        const data = await request.json()
        const updateRole = await prisma.user.update({
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
        return new Response("Success")
    }catch(e:any){
        console.log(e)
        return new Response("not success")
    }
}

// Ensure each function has a proper response and is catching errors