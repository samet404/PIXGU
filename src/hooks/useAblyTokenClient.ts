import * as Ably from 'ably'
import { type ClientOptions } from 'ably'
import { useRef } from 'react'
/**
 * This hook can create an Ably client with token authentication. Shouldn't be used in server-side code. Use 'useAblyBasicClient' instead.
 * @see https://ably.com/docs/auth/token
 */
export const useAblyTokenClient = (clientOptions: ClientOptions) =>
  useRef(
    new Ably.Realtime({
      authUrl: clientOptions.authUrl ?? '/api/ably/auth/token',
      authMethod: clientOptions.authMethod ?? 'POST',
      echoMessages: clientOptions.echoMessages ?? false,
      ...clientOptions,
    }),
  )
