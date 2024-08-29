'use client'

import type { PropsWithChildren } from 'react'
import { usePlayers } from '@/zustand/store'

export const Blur = ({ children }: PropsWithChildren) => {
  const playersCount = usePlayers((s) => s.value.count)

  const text = (() => {
    if (playersCount === 1) return 'Waiting for players'
    return 'Waiting host to start the game'
  })()

  return children
  // return (
  //   <div
  //     className={clsxMerge(
  //       ' z-40 flex h-full w-full animate-fade items-center justify-center blur-lg duration-1000',
  //       {
  //         'blur-none': !isPaused && playersCount !== 0,
  //       },
  //     )}
  //   >
  //     {playersCount === 0 ? <div>Waiting for 1 player</div> : null}
  //     {children}
  //   </div>
  // )
}
