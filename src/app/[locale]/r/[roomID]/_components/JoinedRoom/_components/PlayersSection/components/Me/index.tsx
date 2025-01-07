'use client'

import { useMyUserInfoForRoomStore } from '@/zustand/provider'
import { Inter, Urbanist } from 'next/font/google'
import { Coin } from './components/Coin'
import {
  useAmIGaveUp,
  useAmIGuessed,
  useAmILoser,
  useWhoIsPainterClient,
} from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect, useRef } from 'react'
import { UserPfp } from '@/components/UserPfp'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: '700',
})

const Me = () => {
  const successSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/success.mp3'),
  )
  const user = useMyUserInfoForRoomStore((state) => state.user)
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)
  const amIGuessed = useAmIGuessed((s) => s.amIGuessed)
  const isGuest = 'ID' in user
  const ID = isGuest ? user?.ID : user?.id
  const name = isGuest ? user?.name : user?.usernameWithUsernameID
  const pfp = isGuest ? null : user?.profilePicture
  const amIGaveUp = useAmIGaveUp((s) => s.value.amIGaveUp)
  const amILoser = useAmILoser((s) => s.value.amILoser)

  useEffect(() => {
    if (!amIGuessed) return

    successSfxRef.current.volume = 0.4
    successSfxRef.current.play()
  }, [amIGuessed])

  return (
    <div
      className={clsxMerge(
        `group group flex w-full flex-col items-center justify-center rounded-t-lg bg-[#ffffff2e]`,
        {
          'bg-[rgba(254,240,41,0.22)]': amIGuessed,
          'bg-[rgba(179,104,255,0.33)]': whoIsPainter.amIPainter,
          'bg-[rgba(255,104,104,0.33)]': amIGaveUp || amILoser,
        },
      )}
    >
      <div className={`flex w-full flex-row items-center justify-between p-2`}>
        <div className="flex w-full flex-row items-center gap-2 peer-hover:bg-red-200 ">
          <UserPfp
            ID={ID}
            width={46}
            height={46}
            src={pfp}
            sizes="calc(1.15vw + 46px)"
            alt="profilePicture"
            className="size-8 h-full flex-shrink-0 select-none rounded-full drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
          />

          <div
            className={`${urbanist.className} line-clamp-1 w-[70%] break-all pr-1 text-sm tracking-wide text-[#ffffffd4] drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]`}
          >
            {name}
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
