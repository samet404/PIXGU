import * as Ably from 'ably'
import { useEffect, useState } from 'react'
import { type Types as AblyTypes } from 'ably'

const createAblyRealtimeClient = (clientOptions: AblyTypes.ClientOptions) =>
  new Ably.Realtime.Promise(clientOptions)

/**
 * Creates ably client for AblyProvider with ssr enabled
 */
export const useAblyRealtimeClient = (
  clientOptions: AblyTypes.ClientOptions,
) => {
  const [client, setClient] = useState<AblyTypes.RealtimePromise | null>(null)

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
