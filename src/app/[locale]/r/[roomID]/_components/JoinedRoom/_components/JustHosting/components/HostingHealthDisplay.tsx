'use client'

import { useAtom } from 'jotai'
import { hostingHealth } from '../atoms'
import { Outfit } from 'next/font/google'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEventListener } from '@/hooks/useEventListener'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const HostingHealthDisplay = () => {
  const [health, setHealth] = useAtom(hostingHealth)
  const { isErr, isLoading, isSuccess, msg } = health

  useEventListener(window, 'offline', () =>
    setHealth({
      isErr: true,
      isLoading: false,
      isSuccess: false,
      msg: 'Room is closed because your internet connection is lost',
    }),
  )

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(20rem at center,${isSuccess ? 'rgba(52, 211, 153, 0.438)' : isErr ? 'rgba(211, 52, 100, 0.438)' : isLoading ? 'rgba(255, 184, 70, 0.400)' : ''}, transparent)`,
      }}
      className={clsxMerge(
        `${outfit.className} flex h-full w-full select-none flex-col items-center justify-center text-center text-[2rem] text-emerald-400  drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)] ease-in-out animate-delay-700`,
        {
          'text-[rgba(224,55,106,0.853)]': isErr,
          'animate-pulse text-[rgb(255,183,70)]': isLoading,
          'animate-pulse': isSuccess,
        },
      )}
    >
      <div className="w-[90%]"> {msg}</div>
    </div>
  )
}
