import { NextResponse, type NextRequest } from 'next/server'
import { api } from '@/trpc/server'
import type { User } from 'lucia'
import { pusherServer } from '@/pusher/server'
import type Pusher from 'pusher'

export const POST = async (req: NextRequest) => {
  console.log('req', req)
  console.log('authentication')
  const userDBInfo = (await api.auth.getUserBySelecting.query({
    id: true,
    profilePicture: true,
    username: true,
    usernameID: true,
    usernameWithUsernameID: true,
  })) as User

  if (!userDBInfo) {
    console.error('NO LOGGED IN USER')
    throw new Error('UNAUTHORIZED')
  }

  // @ts-ignore
  const socketId = req.body!.socket_id

  // Replace this with code to retrieve the actual user id and info
  const user: Pusher.UserChannelData = {
    id: userDBInfo.id,
    user_info: {
      ...userDBInfo,
    },
  }

  const authResponse = pusherServer().authenticateUser(socketId, user)
  NextResponse.json(authResponse)
}
