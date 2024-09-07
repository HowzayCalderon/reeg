

interface Components {
    children: React.ReactNode
}


export default function Layout({children}: Components){

    return (
        <>
            <body className="bg-slate-300">
                <section className="h-full">
                    {children}
                </section>
            </body>
        </>
    )
}