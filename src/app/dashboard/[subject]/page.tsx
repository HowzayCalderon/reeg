import React from "react";

export const dynamicParams = false;
export const revalidate = 10;

export async function generateStaticParams(){
    const subjects = await fetch('http://localhost:3000/api/subject')
    .then((res) => res.json())
    return subjects.map((sub: any) => {
        subject: sub.name
    })
}

export default async function Page({ params }: { params: { subject: string }}){
    const { subject } = params
    
}



//  **   FETCH QUESTIONS FROM SUBJECT MODEL INSTEAD OF QUESTION MODEL