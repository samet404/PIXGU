'use client'

import { AblyProvider } from 'ably/react'
import { useAtomValue } from 'jotai'
import { userIDAtom } from '../../../atoms'
import { type ReactNode } from 'react'
import { useAblyRealtimeClient } from '@/src/hooks/useAblyRealtimeClient'

const AblyProviderComponent = ({ children }: { children: ReactNode }) => {
  const userID = useAtomValue(userIDAtom)

  const ablyClient = useAblyRealtimeClient({
    authUrl: '/api/ably/token',
    authMethod: 'POST',
    echoMessages: false,
    clientId: userID!,
  })

  if (!ablyClient) return <div className="text-white">loading...</div>

  return <AblyProvider client={ablyClient}>{children}</AblyProvider>
}
export default AblyProviderComponent
