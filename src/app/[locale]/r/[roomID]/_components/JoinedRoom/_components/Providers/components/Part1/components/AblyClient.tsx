import type { ReactNode } from 'react'
import { AblyClientContext } from '@/context/client'
import * as Ably from 'ably'

const AblyClient = ({ children, roomID }: Props) => {
  const ablyClient = new Ably.Realtime({
    authUrl: `/r/${roomID}/api/ably/auth/token`,
    authMethod: 'POST',
    echoMessages: false,
  })

  return (
    <AblyClientContext.Provider value={ablyClient}>
      {children}
    </AblyClientContext.Provider>
  )
}

export default AblyClient

type Props = {
  children: ReactNode
  roomID: string
}
