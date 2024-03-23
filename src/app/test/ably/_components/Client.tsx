'use client'

import * as Ably from 'ably'
import { AblyProvider, useChannel, usePresence } from 'ably/react'
import Client2 from './Client2'
import { createId } from '@paralleldrive/cuid2'

const client = new Ably.Realtime.Promise({
  authUrl: '/api/ably/token',
  authMethod: 'POST',
  echoMessages: false,
  clientId: createId(),
})

const Client = () => {
  return (
    <AblyProvider client={client}>
      <Client2 />
    </AblyProvider>
  )
}
export default Client
