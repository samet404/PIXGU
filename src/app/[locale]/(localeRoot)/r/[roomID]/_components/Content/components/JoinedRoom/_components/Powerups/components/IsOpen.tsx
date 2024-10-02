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

  if (openPanel === 'power-ups')
    return (
      <section
        className={`${outfit.className} absolute left-0 top-0  z-[60] flex h-full w-full animate-fade-right flex-row items-start justify-center gap-5 bg-[#0000004f] backdrop-blur-sm animate-duration-200`}
      >
        <div
          style={{
            backgroundImage:
              'radial-gradient(at 1% 0%, hsla(60,98%,49%,1) 0px, transparent 50%), radial-gradient(at 0% 90%, #ffe600ff 0px, transparent 50%)',
          }}
          className="flex h-full w-[50%] flex-col items-center justify-center gap-[20%] "
        >
          {children}
        </div>
        <div onClick={() => setOpenPanel(null)} className="h-full w-full"></div>
      </section>
    )
}
