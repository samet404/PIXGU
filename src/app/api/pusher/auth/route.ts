import { getPusherServer } from '@/pusher/server'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'

const pusherServer = getPusherServer()

export async function POST(req: Request) {
  console.log('authenticating yalandan...')
  const data = await req.text()
  const [socketId, channelName] = data
    .split('&')
    .map((str) => str.split('=')[1])

  const user = await api.auth.getUser.query()
  if (!user) redirect('/login')

  const isPresenceChannel = channelName?.startsWith('presence-')

  const authResponse = pusherServer.authorizeChannel(
    socketId!,
    channelName!,
    isPresenceChannel
      ? {
          user_id: user.id,
          user_info: {
            profilePicture: user.profilePicture,
            username: user.username,
            usernameID: user.usernameID,
            usernameWithUsernameID: user.usernameWithUsernameID,
          },
        }
      : undefined,
  )

  return new Response(JSON.stringify(authResponse))
}
