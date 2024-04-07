'use client'

import { AblyProvider, ChannelProvider } from 'ably/react'
import { type ReactNode } from 'react'
import { type Realtime } from 'ably'

const AblyProviders = ({
  client,
  children,
}: {
  client: Realtime
  children: ReactNode
}) => {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="webrtctest">{children}</ChannelProvider>
    </AblyProvider>
  )
}
export default AblyProviders
