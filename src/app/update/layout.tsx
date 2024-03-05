import { type ReactNode } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const updateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`${inter.className} flex h-full w-full flex-col`}>
      <h3 className="w-full bg-gradient-to-tr from-yellow-300 to-yellow-500 p-3 text-center font-[800] text-black text-yellow-900 selection:bg-yellow-400 selection:text-black">
        Update Notes
      </h3>
      <main className="flex grow justify-center overflow-y-scroll p-4 text-yellow-400">
        {children}
      </main>
    </div>
  )
}

export default updateLayout
