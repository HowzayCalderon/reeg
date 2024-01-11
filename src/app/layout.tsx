import './globals.css'

export const metadata = {
  title: 'reeg',
  description: 'Defeat the Regents Exam',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>{children}</body>
    </html>
  )
}
