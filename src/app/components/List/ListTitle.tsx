import React from 'react'
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { useState } from 'react'

interface Props {
  Title: string,
  setter: React.Dispatch<React.SetStateAction<boolean>>
  status: boolean
}

function ListTitle({Title, setter, status}: Props) {

  return (
    <div className='flex justify-between cursor-pointer' onClick={() => {status ? setter(false): setter(true)}}>
        <h1>{Title}</h1>
        {status ? <ArrowDropDown/> : <ArrowDropUp/>}
    </div>
  )
}

export default ListTitle