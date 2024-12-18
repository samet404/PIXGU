'use client'

import type { PropsWithChildren } from 'react'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useHostPeer, useDeveloperSettings, usePlayers } from '@/zustand/store'
import Spinner from '@/components/Spinner'
import { clsxMerge } from '@/utils/clsxMerge'
import { RefreshBtn } from '@/components/RefreshBtn'
import { ShowAfterMs } from '@/components/ShowAfterMs'
import Link from 'next/link'

export const Status = ({ children }: PropsWithChildren) => {
  // return children
  const playerCount = usePlayers((s) => s.value.count)
  const inDeveloperMode = useDeveloperSettings((s) => s.isOpen)
  const isGameStopped = useIsGameStopped((s) => s.value)
  const hostPeerStatus = useHostPeer((s) => s.status)
  const { code, isStopped } = isGameStopped

  if (!isStopped) return null

  const text = (() => {
    switch (hostPeerStatus) {
      case 'connecting':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className='flex flex-row gap-3'>
              <div>Connecting to host</div>
              <Spinner className="drop-shadow-none" />
            </div>
            <div className='flex flex-row gap-2'>
              <RefreshBtn className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]' >
                Try again
              </RefreshBtn>
              <Link href='/join' className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]'>
                Go to active rooms
              </Link>
            </div>
          </div>
        )
      case 'failed':
        return (
          <div className="flex flex-col items-center gap-2">
            <div>WebRTC connection failed</div>
            <div className='flex flex-row gap-2'>
              <RefreshBtn className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]' >
                Try again
              </RefreshBtn>
              <Link href='/join' className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]'>
                Go to active rooms
              </Link>
            </div>
          </div>
        )
      case 'finding host':
        return (
          <div className="flex flex-col items-center gap-4">
            <div className='flex flex-col gap-1 items-center'>
              <div className='flex flex-row gap-3'>
                <div>Finding host</div>
                <Spinner className="drop-shadow-none" />
              </div>
              <div className='flex flex-row gap-2'>
                <RefreshBtn className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]' >
                  Try again
                </RefreshBtn>
                <Link href='/join' className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]'>
                  Go to active rooms
                </Link>
              </div>
            </div>
            <ShowAfterMs ms={5000}>
              <div className='flex flex-row gap-1'>
                <div className='text-sm bg-red-500 text-white px-2 py-1 rounded-md animate-fade'>
                  Looks like host is not in the room.
                </div>
              </div>
            </ShowAfterMs>
          </div>
        )
      case 'disconnected':
        return (
          <div className="flex flex-col items-center gap-2">
            <div>Disconnected</div>
            <div className='flex flex-row gap-2'>
              <RefreshBtn className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]' >
                Try again
              </RefreshBtn>
              <Link href='/join' className='rounded-md px-2 py-1 text-base text-white bg-[#ffffff33]'>
                Go to active rooms
              </Link>
            </div>
          </div>
        )
    }

    switch (code[0]) {
      case 'waitingForHost':
        return 'Waiting for host to start the game'

      case 'waitingForPlayers':
        return <div className='flex flex-col  items-center gap-2'>
          <div>

            Waiting for players to join
          </div>
          {playerCount + 1}/10
        </div>
    }
  })()

  return (
    <div
      className={clsxMerge(
        `absolute z-40 flex h-full w-full items-center justify-center bg-gradient-to-tr duration-1000`,
        {
          '': !inDeveloperMode,
          'bg-[#ffe14cff]': hostPeerStatus === 'connecting',
          'bg-[#ff5ea4]': hostPeerStatus === 'disconnected',
          'bg-[#ff62a6ff]': hostPeerStatus === 'failed',
          'bg-[#e6d240ff]': hostPeerStatus === 'finding host',
          'bg-[#47d69aff]': code[0] === 'waitingForHost',
          'bg-[#63e6afff]': code[0] === 'waitingForPlayers',
        },
      )}
    >
      <div
        className={clsxMerge(
          `flex items-center justify-center rounded-lg px-2 py-1 text-[2rem] font-[500] text-white `,
        )}
      >
        {text}
      </div>

      {children}
    </div>
  )
}
