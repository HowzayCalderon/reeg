import React from 'react'

interface Props {
    className: string,
}

function ListItem({className}: Props) {
  return (
    <div>
        <p>{className}</p>
    </div>
  )
}

export default ListItem