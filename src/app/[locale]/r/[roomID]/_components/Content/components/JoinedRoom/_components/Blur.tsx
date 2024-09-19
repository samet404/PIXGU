'use client'

import type { PropsWithChildren } from 'react'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useAmISpectator } from '@/zustand/store'

export const Blur = ({ children }: PropsWithChildren) => {
  const isGameStopped = useIsGameStopped((s) => s.value)
  const isSpectator = useAmISpectator((s) => s.amISpectator)
  const { code, isStopped } = isGameStopped

  if (!isStopped || isSpectator) return null

  const text = (() => {
    switch (code[0]) {
      case 'connectingToHost':
        return 'Connecting to host'

      case 'waitingForHost':
        return 'Waiting for host to start the game'

      case 'waitingForPlayers':
        return 'Waiting for players to join'
    }
  })()

  return (
    <div
      className={
        'absolute z-40 flex h-full w-full animate-fade-down items-center justify-center backdrop-blur-lg duration-1000'
      }
    >
      <div className="rounded-lg bg-blue-400 p-2 text-[2rem] font-bold text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.)]">
        {text}
      </div>

      {children}
    </div>
  )
}
