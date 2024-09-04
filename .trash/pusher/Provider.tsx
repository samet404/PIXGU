'use client'

import { SoketiClientCtx } from '@/context/client/react'
import { getPusherClient } from '@/pusher/client'
import { useEffect, type PropsWithChildren } from 'react'

export const Provider = ({ children }: PropsWithChildren) => {
  const pusherClient = getPusherClient()

  useEffect(() => {
    return () => {
      pusherClient.disconnect()
    }
  }, [])

  return (
    <SoketiClientCtx.Provider value={pusherClient}>
      {children}
    </SoketiClientCtx.Provider>
  )
}
