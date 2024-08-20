'use client'

import { useEffect, type ReactNode } from 'react'
import { SoketiClientCtx } from '@/context/client/react'
import { getPusherClient } from '@/pusher/client'

export const SoketiClient = ({ children, roomID }: Props) => {
  const soketiClient = getPusherClient({
    authEndpoint: `${roomID}/api/pusher/auth`,
    cluster: 'your_cluster',
  })

  useEffect(() => {
    return () => {
      soketiClient.disconnect()
    }
  }, [])

  return (
    <SoketiClientCtx.Provider value={soketiClient}>
      {children}
    </SoketiClientCtx.Provider>
  )
}

type Props = {
  children: ReactNode
  roomID: string
}
