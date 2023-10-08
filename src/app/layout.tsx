import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from './components/nav-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'מלחמת חרבות ברזל - איתור ועדכון נעדרים',
  description: 'מלחמת חרבות ברזל - איתור ועדכון נעדרים',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning >
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
