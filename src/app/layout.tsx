import './globals.css'
import Nav from './components/Navbar/Nav';
import Authprovider from './components/Authprovider';

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
      <Authprovider>
        <body>
            {children}
        </body>
      </Authprovider>
    </html>
  )
}
