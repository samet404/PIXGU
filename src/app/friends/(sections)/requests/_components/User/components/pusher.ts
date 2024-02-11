'use server'
import { pusherServer } from '@/pusher/server'

export async function pusher() {
  try {
    await pusherServer.trigger(
      'incoming_friend_requests',
      'refetch_requests',
      'dopsa',
    )
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }

  // ...
}
