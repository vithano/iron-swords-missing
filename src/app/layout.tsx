import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@/components/theme-provider"
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: ' חרבות ברזל - איתור ועדכון נעדרים',
  description: ' חרבות ברזל - איתור ועדכון נעדרים',
  openGraph: {
    images: [
      {
        url: 'https://iron-swords-missing.vercel.app/logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'Iron Swords',
      },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
            <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
