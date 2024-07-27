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
        <section>
            {data ? data.map((clas:any) => {
                return (
                    <aside>
                        <h1>{clas.classname}</h1>
                    </aside>
                )
            }) : null}
        </section>

    </>
  )
}

export default List

