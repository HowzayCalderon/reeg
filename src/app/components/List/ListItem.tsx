import React from 'react'
import Link from 'next/link'

interface Props {
    className: string,
}

function ListItem({className}: Props) {
  return (
    <Link className='w-full'href={`http://localhost:3000/dashboard/teacher/${className}`}>
        <p>{className}</p>
    </Link>
  )
}

export default ListItem