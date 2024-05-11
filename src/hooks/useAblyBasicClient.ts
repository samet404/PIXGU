import 'server-only'

import * as Ably from 'ably'
import { type ClientOptions } from 'ably'

/**
 * This hook can create a basic Ably client. Shouldn't be used in client-side code. Use 'useAblyTokenClient' instead.
 * @see https://ably.com/docs/auth/basic
 */
export const useAblyBasicClient = async (clientOptions?: ClientOptions) => {
  const key =
    clientOptions?.key ?? (await import('@/env/server.mjs')).env.ABLY_API_KEY

  const basicClientOptions = {
    key: key,
    echoMessages: clientOptions?.echoMessages ?? false,
    ...clientOptions,
  }

  return {
    ablyClient: new Ably.Realtime(basicClientOptions),
  }
}
