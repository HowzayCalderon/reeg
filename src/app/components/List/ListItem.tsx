import React from 'react'
import Link from 'next/link'

interface Props {
    className: string,
}

function ListItem({className}: Props) {
  return (
    <aside>
        <Link href={`http://localhost:3000/dashboard/${className}`}>{className}</Link>
    </aside>
  )
}

export default ListItem