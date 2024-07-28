import Nav from "@/components/Navbar/Nav"

interface Components {
    children: React.ReactNode
}


export default function Layout({children}: Components){

    return (
        <>
            <body className="grid grid-cols-[1fr_4fr] gap-1 bg-slate-300">
                <section className="row-span-full">
                    <Nav/>
                </section>
                <section className="">
                    {children}
                </section>
            </body>
        </>
    )
}