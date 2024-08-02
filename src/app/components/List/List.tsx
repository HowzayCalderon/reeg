import React from 'react'
import ListItem from './ListItem'

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

