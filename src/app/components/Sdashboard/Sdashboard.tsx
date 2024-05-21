import Link from "next/link"

interface props {
    username: String | null | undefined,
    role: String,
    id: String
}

function Sdashboard(){

    return(
        <>
            <p> Hello, Student</p>
            <h1 className='text-3xl pt-2'>Classes</h1>
            <h1 className='text-3xl pt-2'>Subjects</h1>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/english language arts'}>English Language Arts</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/algebra'}>Algebra</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/algebra II'}>Algebra II</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/geometry'}>Geometry</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/united states history and government'}>United States History and Governemnt</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/global history and geography'}>Global History and Geography</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/living environment'}>Living Environment</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/chemistry'}>Chemistry</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/earth science'}>Earth Science</Link>
            <Link className='border-black border-2 p-1 inline-block mb-1 mr-1'href={'/dashboard/physics'}>Physics</Link>
        </>
    )
}

export default Sdashboard