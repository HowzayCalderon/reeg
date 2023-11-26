import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: NextRequest){
    const requestHeaders = new Headers(request.headers)

    // function getUser(){
    //     await prisma.user.findUnique()
    // }
}

// figure out how to extract username from request and insert it into getUser function