import React from 'react'

function Tdashboard({role}: any) {


  return (
    <div className='grid grid-cols-3 gap-0.5 my-1'>
        <section className='border-black border-2 rounded'>
          <h1>Account</h1>
        </section>
        <section className='border-black border-2 rounded h-10 col-span-2'>
          <h1 className='border-b-2 border-black w-1/2'>Classes</h1>
        </section>
    </div>
  )
}

export default Tdashboard