import React from "react";
import { NextRequest } from "next/server";

async function getQuestions(subject: string){
    const response = await fetch(`http://localhost:3000/api/subject/questions?subject=${subject}`, {method: 'GET'})
    return response.json()
}


export default async function Page({ params }: { params: { subject: string }}){
    const questions = await getQuestions(params.subject)
    console.log(questions[0])
}



