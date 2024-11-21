'use client'

import { useAtom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { openPanelAtom } from '../../atoms'


export const IsOpen = ({ children }: PropsWithChildren) => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  if (openPanel === 'power-ups')
    return (
      <section
        className='absolute left-0 top-0  z-[60] flex h-full w-full animate-fade bg-[#0000004f] backdrop-blur-sm animate-duration-200'
      >
        <div className='w-full h-full relative flex-row items-start justify-center gap-5 flex'>
          <div
            style={{
              backgroundImage:
                'radial-gradient(at 1% 0%, hsla(60,98%,49%,1) 0px, transparent 50%), radial-gradient(at 0% 90%, #ffe600ff 0px, transparent 50%)',
            }}
            className="flex h-full w-[50%] animate-fade-right flex-col items-center justify-center gap-[20%] "
          >
            {children}
          </div>
          <div onClick={() => setOpenPanel(null)} className="h-full w-full"></div>
          <div className='absolute right-0 top-1/2 -translate-y-1/2 transform-gpu origin-right animate-fade'>
            <div className='rotate-90 whitespace-nowrap  selection:!bg-[#ffffff19]  text-[3rem] text-[#ffffffdc] drop-shadow-[0_0px_6px_#ffff00ff]'>
              POWER-UPS
            </div>
          </div>
        </div>

      </section>
    )
}
