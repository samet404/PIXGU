'use client'

import type { PropsWithChildren } from 'react'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useAmISpectator, useHostPeer } from '@/zustand/store'
import Spinner from '@/components/Spinner'
import { clsxMerge } from '@/utils/clsxMerge'

export const Blur = ({ children }: PropsWithChildren) => {
  const isGameStopped = useIsGameStopped((s) => s.value)
  const isSpectator = useAmISpectator((s) => s.amISpectator)
  const hostPeerStatus = useHostPeer((s) => s.status)
  const { code, isStopped } = isGameStopped

  if (!isStopped || isSpectator) return null

  const text = (() => {
    switch (hostPeerStatus) {
      case 'connecting':
        return (
          <div className="flex flex-row gap-4">
            <div>Connecting to host</div>
            <Spinner className="drop-shadow-none" />
          </div>
        )
      case 'failed':
        return (
          <div className="flex flex-row gap-4">
            <div>Failed to connect to host</div>
          </div>
        )
      case 'finding host':
        return (
          <div className="flex flex-row gap-4">
            <div>finding host</div>
          </div>
        )
      case 'disconnected':
        return (
          <div className="flex flex-row gap-4">
            <div>Disconnected</div>
          </div>
        )
    }

    switch (code[0]) {
      case 'waitingForHost':
        return 'Waiting for host to start the game'

      case 'waitingForPlayers':
        return 'Waiting for players to join'
    }
  })()

  const bgColor = (() => {
    switch (hostPeerStatus) {
      case 'connecting':
        return 'from-[#eed03bd7] to-[#f5cb27d7]'
      case 'disconnected':
        return 'from-[#d9538d] to-[#ee0351]'
      case 'failed':
        return 'from-[#d9538dbd] to-[#ee0351b7]'
      case 'finding host':
        return 'from-[#fef08ad9] to-[#ffef77bf]'
    }

    switch (code[0]) {
      case 'waitingForHost':
        return 'from-[#47d69ac2] to-[#47d6b7c2]'
      case 'waitingForPlayers':
        return 'from-[#47d69ac2] to-[#47d6b7c2]'
    }
  })()

  return (
    <div
      className={
        'absolute z-40 flex h-full w-full animate-fade-down items-center justify-center backdrop-blur-lg duration-1000'
      }
    >
      <div
        className={clsxMerge(
          `flex items-center justify-center rounded-lg bg-gradient-to-tr px-2 py-1 text-[2rem] font-[500] text-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.)] ${bgColor}`,
        )}
      >
        {text}
      </div>

      {children}
    </div>
  )
}
