'use client'

import { useMyUserInfoForRoomStore } from '@/zustand/provider'
import { Urbanist, Inter } from 'next/font/google'
import { Img } from './components/Img'
import { Coin } from './components/Coin'
import {
  useAmIGuessed,
  useAmISpectator,
  useWhoIsPainterClient,
} from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect, useRef } from 'react'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const Me = () => {
  const successSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/success.mp3'),
  )
  const { profilePicture, usernameWithUsernameID } = useMyUserInfoForRoomStore(
    (state) => state.user,
  )
  const amISpectator = useAmISpectator((s) => s.amISpectator)
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)
  const amIGuessed = useAmIGuessed((s) => s.amIGuessed)

  useEffect(() => {
    if (!amIGuessed) return

    successSfxRef.current.volume = 0.4
    successSfxRef.current.play()
  }, [amIGuessed])

  return (
    <div
      className={clsxMerge(
        `group group flex w-full flex-col items-center justify-center rounded-lg bg-[#ffffff2e]`,
        {
          'bg-[rgba(179,104,255,0.33)]':
            whoIsPainter.status === 'currentPainter' && whoIsPainter.amIPainter,
          'bg-[rgba(254,240,41,0.22)]': amIGuessed === true,
          'opacity-50': amISpectator,
        },
      )}
    >
      <div className={`flex w-full flex-row items-center justify-between p-2`}>
        <div className="flex w-full flex-row items-center gap-2 peer-hover:bg-red-200 ">
          {profilePicture ? (
            <Img src={profilePicture} />
          ) : (
            <div className="flex-shrink-0 select-none rounded-full bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"></div>
          )}
          <div
            className={`${urbanist.className} line-clamp-1 w-[70%] break-all pr-1 text-sm tracking-wide text-[#ffffffd4] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]`}
          >
            {usernameWithUsernameID}
          </div>
        </div>
        <div
          className={`${inter.className} flex  items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 p-2 text-xs tracking-tighter text-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)]`}
        >
          <div className="flex drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
            <Coin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Me
