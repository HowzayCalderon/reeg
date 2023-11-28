import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import Email from "next-auth/providers/email";

const prisma = new PrismaClient()

export async function GET(request: NextRequest, response: NextResponse){
   request.json()
        
    
}

export async function POST(request: NextRequest, response: NextResponse){
    request.json()
    .then(async (res) => {
        await prisma.user.create({
            data: {
                email: res.email,
                name: res.name
            }
        })
    })
    return new Response("New User Created")
}

// figure out how to extract username from request and insert it into getUser function