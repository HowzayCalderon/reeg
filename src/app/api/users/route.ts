import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, response: NextResponse){
    const headerslist = request.headers
    let email = headerslist.get('email') || ''

    const user = await prisma.user.findUnique({
        where: {
            'email': email
        }
    })

    if(user){
        return true;
    }else{
        return new Response("User not found");
    }
        
    
}

// figure out how to extract username from request and insert it into getUser function