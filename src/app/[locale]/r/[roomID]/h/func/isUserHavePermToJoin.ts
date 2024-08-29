import 'server-only'

import { redisDb } from '@/db/redis'

export const isUserHavePermToJoin = async (userID: string, roomID: string) => {
  const isRoomHavePassword = await redisDb.exists(`room:${roomID}:password`)

  if (isRoomHavePassword === 1) {
    const isUserKnowPass = await redisDb.sismember(
      `room:${roomID}:players_known_pass`,
      userID,
    )
    if (isUserKnowPass === 0) throw new Error('PASSWORD_REQUIRED')
  }

  const isUserBlocked = await redisDb.sismember(
    `room:${roomID}:blocked_players`,
    userID,
  )
  if (isUserBlocked === 1) throw new Error('BLOCKED')
}
