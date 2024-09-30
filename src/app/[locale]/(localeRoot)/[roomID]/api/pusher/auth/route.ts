import { api } from '@/trpc/server'
import type { Locale } from '@/types/locale'

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      locale: Locale
      roomID: string
    }
  },
) {
  const data = await req.text()
  const [socketId, channelName] = data
    .split('&')
    .map((str) => str.split('=')[1])

  const authResponse = await api.auth.pusherGameRoom.mutate({
    roomID: params.roomID,
    socketId: socketId!,
    channelName: channelName!,
    isHostApi: false,
  })

  return new Response(JSON.stringify(authResponse))
}
