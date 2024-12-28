'use client'

import { useAtom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { openPanelAtom } from '../../atoms'


export const IsOpen = ({ children }: PropsWithChildren) => {
  const [openPanel, setOpenPanel] = useAtom(openPanelAtom)

  if (openPanel === 'marketplace')
    return (
      <section
        id="marketplaceSection"
        className='absolute left-0 top-0 z-30 flex h-full w-full animate-fade flex-col items-start justify-end bg-[#0000004f]  bg-gradient-to-t from-[#cf076b] from-[35%] to-transparent backdrop-blur-sm animate-duration-200'
      >
        <div className='text-[#ffffffdd] drop-shadow-[0_0px_6px_#ca006cb7] top-0 left-0 flex-col gap-1 w-full flex items-center justify-center'>
          <div className='pt-[4rem] text-[3rem]'>
            Marketplace
          </div>
          <div>
            You can buy power-ups or something here.
          </div>
        </div>
        <div onClick={() => setOpenPanel(null)} className="absolute top-0 left-0 h-[50%] w-full"></div>
        {children}
      </section>
    )
}
