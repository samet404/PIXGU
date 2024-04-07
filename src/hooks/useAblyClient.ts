import * as Ably from 'ably'
import { type ClientOptions } from 'ably'
import { useRef } from 'react'

export const useAblyClient = (clientOptions: ClientOptions) =>
  useRef(
    new Ably.Realtime({
      authUrl: clientOptions.authUrl ?? '/api/ably/auth/token',
      authMethod: clientOptions.authMethod ?? 'POST',
      echoMessages: clientOptions.echoMessages ?? false,
      ...clientOptions,
    }),
  )
