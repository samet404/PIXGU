'use client'

import { useAtom } from 'jotai'
import { Outfit } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import { openPanelAtom } from '../../atoms'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700'],
})

export const IsOpen = ({ children }: PropsWithChildren) => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  if (openPanel === 'marketplace')
    return (
      <section
        id="playersSection"
        className={`${outfit.className} absolute left-0 top-0 z-30 flex h-full w-full animate-fade-up flex-col items-start justify-end overflow-x-scroll bg-gradient-to-t from-[#cf076b] from-[35%] to-transparent backdrop-blur-sm animate-duration-200`}
      >
        <div onClick={() => setOpenPanel(null)} className="h-full w-full"></div>
        {children}
      </section>
    )
}
