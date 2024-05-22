import 'server-only'

import { redisDb } from '@/db/redis'
import { db } from '@/db/sqlDb'
import { gameRoom } from '@/schema/gameRoom'
import { usersToGameRoom } from '@/schema/user'
import { eq } from 'drizzle-orm'

/**
 * Deletes everything related to a room in the sql database and redis and kicks all the players from the room.
 * */
export const killRoom = async (roomID: string) => {
  console.log(`💬 | Killing room ${roomID}`)

  try {
    await db
      .delete(usersToGameRoom)
      .where(eq(usersToGameRoom.gameRoomID, roomID))

    await db.delete(gameRoom).where(eq(gameRoom.ID, roomID))

    const playersIDs = await redisDb.smembers(`room:${roomID}:players`)

    for (const ID of playersIDs) {
      await redisDb.srem(`user:${ID}:playing_rooms`, roomID)
    }

    await redisDb.srem(`active_rooms`, roomID)

    await redisDb.del(`room:${roomID}:name`)
    await redisDb.del(`room:${roomID}:admins`)
    await redisDb.del(`room:${roomID}:password`)
    await redisDb.del(`room:${roomID}:players`)
    await redisDb.del(`room:${roomID}:players_known_pass`)
    await redisDb.del(`room:${roomID}:created_at`)

    console.log(`✅ | Room ${roomID} killed`)
  } catch (e) {
    console.error(`❌ | Error at killing room ${roomID}`)
    if (e instanceof Error) throw new Error(e.message)
  }
}
