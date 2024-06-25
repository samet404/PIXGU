import type { ReactNode } from 'react'
import { AblyClientContext } from '@/context/client'
import * as Ably from 'ably'
import { useInterval } from 'usehooks-ts'

const AblyClient = ({ children, roomID }: Props) => {
  const ablyClient = new Ably.Realtime({
    authUrl: `/r/${roomID}/api/ably/auth/token`,
    authMethod: 'POST',
    echoMessages: false,
  })

  useInterval(() => console.log(ablyClient.connection.state), 4000)

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
