'use client'

import { AblyProvider } from 'ably/react'
import { useAtomValue } from 'jotai'
import { userIDAtom } from '../../../atoms'
import { type ReactNode } from 'react'
import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'

const AblyProviderComponent = ({ children }: { children: ReactNode }) => {
  const userID = useAtomValue(userIDAtom)

  const { ablyClient } = useAblyTokenClient({
    clientId: userID!,
  })

  if (!ablyClient) return <div className="text-white">loading...</div>

  return <AblyProvider client={ablyClient.current}>{children}</AblyProvider>
}
export default AblyProviderComponent
