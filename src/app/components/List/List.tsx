import React from 'react'
import ListItem from './ListItem'
import ListTitle from './ListTitle'
import { useState } from 'react'

interface classData {
    classname: string,
    id: number,
    students: {}[],
    teacherId: number,
    topicId: number
}


function List({data}: {data: Array<classData>}) {
  const [listStatus, setListStatus] = useState<boolean>(false)  
  return (
    <>
        <ListTitle Title='Classes' setter={setListStatus} status={listStatus}/>
        {listStatus ? 
        <section className='mb-2'>
            {data ? data.map((clas:classData) => {
                return (
                    <ListItem className={clas.classname}/>
                )
            }) : null}
        </section>: null
        }
    </>
  )
}

export default List

