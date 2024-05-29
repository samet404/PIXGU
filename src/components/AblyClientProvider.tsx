'use client'

import type { ReactNode } from 'react'
import type { Optional } from '@/types'
import * as Ably from 'ably'
import { type ClientOptions } from 'ably'
import { AblyClientContext } from '@/context/client'

const AblyClientProvider = ({ clientOptions, children }: Props) => {
  const client = new Ably.Realtime({
    authUrl: clientOptions.authUrl,
    authMethod: clientOptions?.authMethod ?? 'POST',
    echoMessages: clientOptions?.echoMessages ?? false,
    ...clientOptions,
  })

  return (
    <AblyClientContext.Provider value={client}>
      {children}
    </AblyClientContext.Provider>
  )
}

export default AblyClientProvider

type Props = {
  clientOptions: Optional<ClientOptions, 'authMethod' | 'echoMessages'>
  children: ReactNode
}
