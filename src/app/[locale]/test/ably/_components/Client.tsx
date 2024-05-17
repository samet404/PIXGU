'use client'

import * as Ably from 'ably'
import { AblyProvider, useChannel, usePresence } from 'ably/react'
import Client2 from './Client2'
import { createId } from '@paralleldrive/cuid2'
import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'

const Client = () => {
  const { ablyClient } = useAblyTokenClient()

  return <Client2 ablyClient={ablyClient.current} />
}
export default Client
