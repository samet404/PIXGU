import type { Options } from 'pusher-js/types/src/core/options'
import PusherClient from 'pusher-js'
import { env } from '@/env/client'

export const getPusherClient = (options?: Options) =>
  new PusherClient(env.NEXT_PUBLIC_PUSHER_KEY, {
    wsHost: '127.0.0.1',
    wsPort: 6002,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'your-cluster',
    authEndpoint: '/api/pusher/auth',

    ...options,
  })
