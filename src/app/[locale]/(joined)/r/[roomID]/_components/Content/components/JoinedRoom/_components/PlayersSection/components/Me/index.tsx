'use client'

import { useMyUserInfoForRoomStore } from '@/zustand/provider'
import { Inter } from 'next/font/google'
import { Coin } from './components/Coin'
import {
  useAmIGuessed,
  useAmISpectator,
  useWhoIsPainterClient,
} from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect, useRef } from 'react'
import { UserPfp } from '@/components/UserPfp'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const Me = () => {
  const successSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/success.mp3'),
  )
  const user = useMyUserInfoForRoomStore((state) => state.user)
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
          'bg-[rgba(254,240,41,0.22)]': amIGuessed === true,
          'bg-[rgba(179,104,255,0.33)]':
            whoIsPainter.status === 'currentPainter' && whoIsPainter.amIPainter,
          'opacity-50': amISpectator,
        },
      )}
    >
      <div className={`flex w-full flex-row items-center justify-between p-2`}>
        <div className="flex w-full flex-row items-center gap-2 peer-hover:bg-red-200 ">
          <UserPfp
            ID={user.type === 'guest' ? user.ID : user.id}
            width={46}
            height={46}
            src={user.type === 'guest' ? null : user.profilePicture}
            sizes="calc(1.15vw + 46px)"
            alt="profilePicture"
            className="size-8 h-full flex-shrink-0 select-none rounded-full drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
          />

          <div className="line-clamp-1 w-[70%] break-all pr-1 text-sm tracking-wide text-[#ffffffd4] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]">
            {user.type === 'guest' ? user.name : user.usernameWithUsernameID}
          </div>
        </div>
        <div
          className={`${inter.className} flex  items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 p-2 text-xs tracking-tighter text-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.1)]`}
        >
          <div className="flex w-14 items-center justify-center text-[0.8rem] leading-3 drop-shadow-[0_0px_2px_rgba(0,0,0,0.3)]">
            <Coin />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Me
