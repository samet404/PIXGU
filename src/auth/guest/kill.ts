import 'server-only'

import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { env } from '@/env/server'
import { REDIS_ROOM_KEYS_BY_ROOM_ID, REDIS_ROOM_KEYS_BY_USER_ID, REDIS_ROOM_OTHERS_KEYS } from '@/constants/server'

export const killGuest = async () => {
  const authToken = (await cookies()).get('guest_auth_session')?.value
  if (authToken) {
    z.string().min(10).cuid2().parse(authToken)

    const guestID = await redisDb.get(`guest:session:${authToken}:ID`)
    await redisDb.del(`guest:session:${authToken}:ID`)
    await redisDb.del(`guest:${guestID}:name`)
    await redisDb.del(`guest:${guestID}:name_ID`)
    await redisDb.del(`guest:${guestID}:name_&_name_ID`)
    await redisDb.del(`user:${guestID}:settings:developer_mode`)

    const redisKeysByUserID = REDIS_ROOM_KEYS_BY_USER_ID(guestID!)

    const createdRooms = await redisDb.smembers(redisKeysByUserID.createdRooms)

    const redisKeysOther = REDIS_ROOM_OTHERS_KEYS

    for (const roomID of createdRooms) {
      const redisKeysByRoomID = REDIS_ROOM_KEYS_BY_ROOM_ID(roomID)

      for (const key of Object.keys(redisKeysByRoomID)) {
        await redisDb.del(key)
      }

      await redisDb.srem(redisKeysOther.activePublicRooms, roomID)
      await redisDb.srem(redisKeysOther.activeRooms, roomID)
    }


    await fetch(`${env.BASE_URL}/api/del-guest-auth-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
}
