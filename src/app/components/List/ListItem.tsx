import React from 'react'

interface Props {
    className: string,
}

function ListItem({className}: Props) {
  return (
    <aside>
        <p onClick={() => {}}>{className}</p>
    </aside>
  )
}

export default ListItem