import React from 'react'

interface classData {
    classname: string,
    id: number,
    students: {}[],
    teacherId: number,
    topicId: number
}


function List({data}: {data: Array<classData>}) {
  return (
    <>
        <h1 className='border-b-2 border-b-black w-1/2 mb-4 px-2'>Classes</h1>
        <section className='mb-2'>
            {data ? data.map((clas:classData) => {
                return (
                    <aside key={clas.id}>
                        <h1 className='hover:bg-slate-200 px-2 cursor-pointer border-b-2 border-b-slate-200'>{clas.classname}</h1>
                    </aside>
                )
            }) : null}
        </section>
    </>
  )
}

export default List

/* 
    CONSIDER ADDING CLASSES TO THE NAVBAR, WHEN TEACHER CLICKS ON 
    SPECIFIC CLASS IT TAKES THEM CLASS SPECIFIC DASHBOARD THAT SHOWS
    CHART OF CLASS PROGRESS, THEN MAKE EACH STUDENT AN OPTION TO CLICK ON
    THAT SHOWS THEIR PROGRESS AND STANDINGS ON A CHART
*/