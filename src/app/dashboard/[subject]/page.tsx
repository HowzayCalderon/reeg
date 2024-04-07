import React from "react";

export const dynamicParams = false;
export const revalidate = 10;

export function generateStaticParams(){
    return [{id: "algebra"},{id: "algebra II"}, {id: "chemistry"},
     {id: "earth science"}, {id: "living environment"},
      {id: "english language arts"}, {id: "global history and geography"}, 
    {id: "geometry"}, {id: "united states history and government"}, {id: "physics"}]
}

export default async function Page({ params }: { params: { id: string }}){
    const { id } = params
   let res = await fetch('http://localhost:3000/api/questions', {
    method: "GET"
   }).then((data) => data.json())
   console.log(res)

}

/* **************************
    add questions get method route to return questions 
    for a specific subject
    **************************
 */ 
