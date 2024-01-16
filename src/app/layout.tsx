import './globals.css'
import Nav from './components/Navbar/Nav'

export const metadata = {
  title: 'reeg',
  description: 'Defeat the Regents Exam',
}

interface Components {
  children: React.ReactNode,
}

export default function RootLayout({
  children
}: Components) {
  return (
    <html lang="en">
        <body>
            <Nav></Nav>
            {children}
        </body>
    </html>
  )
}
