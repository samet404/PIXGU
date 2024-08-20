import { getPusherServer } from '@/pusher/server'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'

const pusherServer = getPusherServer()

export async function POST(req: Request) {
  console.log('authenticating pusher perms...')
  const data = await req.text()
  const [socketId, channelName] = data
    .split('&')
    .map((str) => str.split('=')[1])

  const user = await api.auth.getUser.query()
  if (!user) redirect('/login')

  const authResponse = pusherServer.authorizeChannel(socketId!, channelName!, {
    user_id: user.id,
    user_info: {
      profilePicture: user.profilePicture,
      username: user.username,
      usernameID: user.usernameID,
      usernameWithUsernameID: user.usernameWithUsernameID,
    },
  })

  return new Response(JSON.stringify(authResponse))
}
