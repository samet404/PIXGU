import * as Ably from 'ably'
import type { ClientOptions, Realtime } from 'ably/ably'
import { useEffect, useState } from 'react'

const createAblyRealtimeClient = (clientOptions: ClientOptions) =>
  new Ably.Realtime(clientOptions)

/**
 * Creates ably client for AblyProvider with ssr enabled
 */
export const useAblyRealtimeClient = (clientOptions: ClientOptions) => {
  const [client, setClient] = useState<Realtime | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('typeof window')

      client?.close()
      setClient(createAblyRealtimeClient(clientOptions))
    }

    if (typeof window == 'undefined') {
      console.log('typeof window not')
    }

    return () => {
      console.log('return')
      client?.close()
      setClient(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return client
}
