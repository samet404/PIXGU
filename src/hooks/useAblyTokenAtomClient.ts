import * as Ably from 'ably'
import type { Realtime, ClientOptions } from 'ably'
import { type PrimitiveAtom, useSetAtom } from 'jotai'
import { useEffectOnce } from './useEffectOnce'

/**
 * This hook can set Ably client jotai atom with token authentication. Shouldn't be used in server-side code. Use 'useAblyBasicClient' instead.
 * @see https://ably.com/docs/auth/token
 */
export const useAblyTokenAtomClient = (
  ablyClientAtom: PrimitiveAtom<Realtime | null>,
  clientOptions?: ClientOptions,
  events?: {
    // eslint-disable-next-line no-unused-vars
    onSuccess?: (client: Realtime) => Promise<void> | void
    // eslint-disable-next-line no-unused-vars
    onError?: (e: Error) => Promise<void> | void
  },
) => {
  const setClient = useSetAtom(ablyClientAtom)

  const ablyClient = new Ably.Realtime({
    authUrl: clientOptions?.authUrl ?? '/api/ably/auth/token',
    authMethod: clientOptions?.authMethod ?? 'POST',
    echoMessages: clientOptions?.echoMessages ?? false,
    ...clientOptions,
  })

  useEffectOnce(() => {
    try {
      setClient(ablyClient)
      if (events?.onSuccess) events.onSuccess(ablyClient)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
        if (events?.onError) events.onError(e)
      }
    }
  })
}
