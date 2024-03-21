import { pusherServer } from '@/src/pusher/server'
import { type drawData } from '@/types/drawData'
import { type NextRequest } from 'next/server'

import { toPusherKey } from '@/src/utils/toPusherKey'

export const POST = async (req: NextRequest) => {
  try {
    await pusherServer.trigger(
      toPusherKey(`game_room:c3dxfjl9dwargv7k5vgsls19`),
      'draw',
      null,
    )

    return new Response('OK', { status: 200 })
  } catch (e) {
    if (e instanceof Error)
      return new Response(`Pusher Error: ${e.message}`, { status: 500 })
  }
}
