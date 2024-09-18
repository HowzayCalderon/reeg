import './globals.css'
import Nav from './components/Navbar/Nav';
import Authprovider from './components/Authprovider';
import { SessionProvider } from 'next-auth/react';

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
        {/* <body> */}
      <Authprovider>
            {children}
      </Authprovider>
        {/* </body> */}
    </html>
  )
}
