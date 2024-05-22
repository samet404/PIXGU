import 'server-only'

import { redisDb } from '@/db/redis'

export const isUserHavePermToJoin = async (userID: string, roomID: string) => {
  const isRoomExits = await redisDb.sismember('active_rooms', roomID)
  if (isRoomExits === 0) throw new Error('ROOM_NOT_FOUND')

  const { ablyBasicClient } = await import('@/utils/ablyBasicClient')
  const { ablyClient } = await ablyBasicClient()

  const roomChannel = ablyClient.channels.get(`room:${roomID}`)
  const members = await roomChannel.presence.get()
  const isUserInRoom = members.some((member) => member.clientId === userID)

  if (isUserInRoom) throw new Error('ALREADY_IN_ROOM')

  const isUserKnowPass = await redisDb.sismember(
    `room:${roomID}:players_known_pass`,
    userID,
  )
  if (isUserKnowPass === 0) throw new Error('PASSWORD_REQUIRED')

  const isUserBlocked = await redisDb.sismember(
    `room:${roomID}:blocked_players`,
    userID,
  )
  if (isUserBlocked === 1) throw new Error('BLOCKED')
}
