import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Adepu Sanjay - Full Stack Developer',
  description: 'Professional portfolio of Adepu Sanjay, Full Stack Developer specializing in MERN stack, Next.js, and React Native development.',
  keywords: 'Full Stack Developer, MERN Stack, Next.js, React Native, JavaScript, Node.js, MongoDB',
  author: 'Adepu Sanjay',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}