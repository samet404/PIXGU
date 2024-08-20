import { pusherServer } from '@/pusher/server'
import { NextResponse, type NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  console.log('req', req)
  console.log('auhtorization')
  const data: Data = await req.json()
  const socketId = data.socket_id
  const channel = data.channel_name
  const pusher = pusherServer()

  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel)

  return NextResponse.json(authResponse)
}

type Data = {
  socket_id: string
  channel_name: string
}
