import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from "@/components/theme-provider"
import NavBar from '../components/nav-bar'
import Footer from '../components/footer'

const inter = Inter({subsets: ['latin']})


export async function generateMetadata(): Promise<Metadata> {
  const url = "https://iron-swords-missing.vercel.app/"
  const title = "חרבות ברזל - איתור ועדכון נעדרים";
  const desc = "חרבות ברזל - איתור ועדכון נעדרים";

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("title", title)
  ogUrl.searchParams.set("type", title)
  ogUrl.searchParams.set("mode", "dark")

  return {
    title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      type: "article",
      url,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: desc,
      images: [ogUrl.toString()],
    },
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
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
