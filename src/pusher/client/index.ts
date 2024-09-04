import type { Options } from 'pusher-js/types/src/core/options'
import PusherClient from 'pusher-js'
import { env } from '@/env/client'

export const getPusherClient = (options?: Options) =>
  new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: env.NEXT_PUBLIC_PUSHER_WS_HOST,
    wsPort: 6002,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'your-cluster',
    authEndpoint: '/api/pusher/auth',

    ...options,
  })
