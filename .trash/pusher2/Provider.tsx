'use client'

import { SoketiClientCtx } from '@/context/client/react'
import { getPusherClient } from '@/pusher/client'
import type { PropsWithChildren } from 'react'

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <SoketiClientCtx.Provider value={getPusherClient()}>
      {children}
    </SoketiClientCtx.Provider>
  )
}
