import { type NextRequest, NextResponse } from 'next/server'
import { api } from '@/trpc/server'
import type { capabilityOp } from 'ably'

export const POST = async (
  req: NextRequest,
  params: { params: { roomID: string } },
) => {
  // we are setting ably client id to prevent users behave like they are someone else

  const clientId = await api.auth.getUserID.query()
  if (!clientId) {
    console.error('NO CLIENT ID')
    throw new Error('UNAUTHORIZED')
  }

  // we are getting the room id from the pathname
  const { roomID } = params.params
  console.log(roomID)
  if (!roomID) {
    console.error('NO ROOM ID')
    throw new Error('BAD_REQUEST')
  }

  // we are checking if the room is active or exists

  const { redisDb } = await import('@/redis')
  const isRoomExist = await redisDb.sismember('active_rooms', roomID)
  if (isRoomExist === 0) throw new Error('ROOM_NOT_FOUND')

  // // we are checking if the user is already in the room

  const { ablyBasicClient } = await import('@/utils/ablyBasicClient')
  const { ablyClient } = await ablyBasicClient()
  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  const presenceData = await roomChannel.presence.get()

  const isClientAlreadyInRoom = presenceData.some(
    (member) => member.clientId === clientId,
  )
  if (isClientAlreadyInRoom) throw new Error('ALREADY_IN_ROOM')

  // Checking if the user is host of the room

  const hostID = await redisDb.get(`room:${roomID}:hostID`)
  const isHost = hostID === clientId

  // Generating the token request for the ably client

  const Ably = await import('ably')
  const { env } = await import('@/env/server')
  const ablyRealtime = new Ably.Realtime({
    key: env.ABLY_API_KEY,
  })

  const capability: Record<string, capabilityOp[]> = {
    [`room:${roomID}`]: ['publish', 'subscribe', 'presence'],
    [`room:${roomID}:connect:*`]: ['subscribe', 'publish'],
    [`server:room:${roomID}:*`]: ['subscribe'],
  }

  const tokenRequestData = await ablyRealtime.auth.createTokenRequest({
    clientId: clientId,
    capability: capability,
  })

  ablyRealtime.close()

  return NextResponse.json(tokenRequestData)
}
