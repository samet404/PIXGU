import 'server-only'

import * as Ably from 'ably'
import { type ClientOptions } from 'ably'

/**
 * This hook can create a basic Ably client. Shouldn't be used in client-side code. Use 'useAblyTokenClient' instead.
 * @see https://ably.com/docs/auth/basic
 */
export const useAblyBasicClient = (clientOptions: ClientOptions) => {
  const basicClientOptions = {
    key: clientOptions.key,
    echoMessages: clientOptions.echoMessages ?? false,
    ...clientOptions,
  }

  return {
    ablyClient: new Ably.Realtime(basicClientOptions),
  }
}
