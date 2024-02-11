import { pusherServer } from '@/pusher/server'
import { NextResponse } from 'next/server'

export async function POST(res: Response) {
  try {
    console.log('deneememmemeememmemem')
    await pusherServer.trigger('test', 'log', {})
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }

  return NextResponse.json({ isSuccess: true })
}
