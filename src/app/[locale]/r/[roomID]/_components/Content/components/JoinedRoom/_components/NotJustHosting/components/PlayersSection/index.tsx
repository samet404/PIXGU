'use client'

import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'
import Me from './components/Me'
import { Others } from './components/Others'
import { clsxMerge } from '@/utils/clsxMerge'
import { Outfit } from 'next/font/google'
import { useAtom } from 'jotai'
import { isPlayersOpenAtom } from './atoms'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700'],
})

const PlayersSection = () => {
  const [isOpen, setIsOpen] = useAtom(isPlayersOpenAtom)
  const documentRef = useRef(document)

  useEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || useHostPeer.getState().status !== 'connected')
        return
      setIsOpen(!isOpen)
    },
    documentRef,
  )

  return (
    <section
      id="playersSection"
      className={clsxMerge(
        `${outfit.className} absolute left-0 top-0 z-30 flex h-full w-full animate-fade-up flex-col items-start justify-end overflow-x-scroll bg-gradient-to-t from-[#07cf86] from-[35%] to-transparent backdrop-blur-sm animate-duration-200`,
        {
          hidden: !isOpen,
        },
      )}
    >
      <div onClick={() => setIsOpen(false)} className="h-full w-full"></div>
      <div className="flex h-full w-full flex-col p-2">
        <div className="text-[3rem] leading-[4rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.70)]">
          Players
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-2 ">
          <Me />
          <Others />
        </div>
      </div>
    </section>
  )
}

export default PlayersSection
