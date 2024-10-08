import type { Options } from 'pusher-js/types/src/core/options'
import PusherClient from 'pusher-js'
import { env } from '@/env/client'

export const getPusherClient = (options?: Options) =>
  new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: env.NEXT_PUBLIC_PUSHER_WS_HOST,
    wssPort: parseInt(env.NEXT_PUBLIC_PUSHER_WSS_PORT),
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    enabledTransports: ['ws', 'wss'],
    forceTLS: true,
    ...options,
  })
