'use client'

import type { PropsWithChildren } from 'react'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useAmISpectator, useHostPeer, useSettings } from '@/zustand/store'
import Spinner from '@/components/Spinner'
import { clsxMerge } from '@/utils/clsxMerge'

export const Blur = ({ children }: PropsWithChildren) => {
  return null
  const inDeveloperMode = useSettings((s) => s.developerMode)
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
            <div>Finding host</div>
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
        return 'from-[#ffe14cff] to-[#ffd428ff]'
      case 'disconnected':
        return 'from-[#ff5ea4] to-[#ee0351]'
      case 'failed':
        return 'from-[#ff62a6ff] to-[#ee0351b7]'
      case 'finding host':
        return 'from-[#e6d240ff] to-[#ffef77ff]'
    }

    switch (code[0]) {
      case 'waitingForHost':
        return 'from-[#47d69aff] to-[#47d6b7ff]'
      case 'waitingForPlayers':
        return 'from-[#63e6afff] to-[#2ddcb6ff]'
    }
  })()

  return (
    <div
      className={clsxMerge(
        `absolute z-40 flex h-full w-full animate-fade-down items-center justify-center bg-gradient-to-tr ${bgColor} duration-1000`,
        {
          '': !inDeveloperMode,
        },
      )}
    >
      <div
        className={clsxMerge(
          `flex items-center justify-center rounded-lg px-2 py-1 text-[2rem] font-[500] text-white`,
        )}
      >
        {text}
      </div>

      {children}
    </div>
  )
}
