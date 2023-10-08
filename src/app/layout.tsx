import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@/components/theme-provider"
import NavBar from '../components/nav-bar'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: ' חרבות ברזל - איתור ועדכון נעדרים',
  description: ' חרבות ברזל - איתור ועדכון נעדרים',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning >
        <head >
          <meta property="og:image" content="<generated>" />
          <meta property="og:image:type" content="<generated>" />
          <meta property="og:image:width" content="<generated>" />
          <meta property="og:image:height" content="<generated>" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
