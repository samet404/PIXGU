import { pusherServer } from '@/src/pusher/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request, res: Response) {
  try {
    await pusherServer.trigger(
      'incoming_friend_requests',
      'refetch_requests',
      'dopsa',
    )
    
    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}
