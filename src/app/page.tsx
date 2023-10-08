import Image from 'next/image'
import {MainNav} from './components/main-nav'
import {Search} from './components/search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainNav />
      <Search />

      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/logo.jpg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />

    </main>
  )
}
