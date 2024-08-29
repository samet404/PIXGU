'use client'

import { useIsGamePaused } from '@/zustand/store/useIsGamePaused'
import BtnLeave from './components/BtnLeave'
import { clsxMerge } from '@/utils/clsxMerge'
import { Outfit } from 'next/font/google'
import { Ping } from './components/Ping'
import { HostConnection } from './components/HostConnection'

const outfit = Outfit({
  subsets: ['latin'],
})

const Nav = () => {
  const isGamePaused = useIsGamePaused((state) => state.get())

  return (
    <nav
      className={clsxMerge(
        `${outfit.className} z-30 flex  w-full animate-fade-down flex-row items-center justify-between py-1 pl-2 pr-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]`,
        {
          'bg-[#292929]':
            isGamePaused.isPaused && isGamePaused.code !== 'connectingHost',
        },
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <HostConnection />

        <Ping />
      </div>

      <BtnLeave />
    </nav>
  )
}

export default Nav
