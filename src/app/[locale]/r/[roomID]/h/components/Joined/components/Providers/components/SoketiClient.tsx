'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { SoketiClientCtx } from '@/context/client/react'
import { getPusherClient } from '@/pusher/client'
import type Pusher from 'pusher-js'

export const SoketiClient = ({ children, roomID }: Props) => {
  const soketiClientRef = useRef<Pusher>(
    getPusherClient({
      authEndpoint: `${window.location.href}/api/pusher/auth`,
      cluster: 'your_cluster',
    }),
  )

  const soketiClient = soketiClientRef.current
  useEffect(() => {
    return () => {
      soketiClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SoketiClientCtx.Provider value={soketiClientRef.current}>
      {children}
    </SoketiClientCtx.Provider>
  )
}

type Props = {
  children: ReactNode
  roomID: string
}
