import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import { usersToGameRoom } from '@/schema/user'
import { asyncTimeout, mToMs } from '@/utils/_index'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const startRoomTimer = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID } = input

    asyncTimeout(mToMs(10))
    // deletes the room values from the databases
    await ctx.db.delete(gameRoom).where(eq(gameRoom.ID, roomID))

    await ctx.redisDb.del(`room:${roomID}:name`)
    await ctx.redisDb.del(`room:${roomID}:admins`)
    await ctx.redisDb.del(`room:${roomID}:password`)
    await ctx.redisDb.del(`room:${roomID}:min_players`)
    await ctx.redisDb.del(`room:${roomID}:max_players`)

    // deletes all players in the room
    await ctx.db
      .delete(usersToGameRoom)
      .where(eq(usersToGameRoom.gameRoomID, roomID))

    const players = await ctx.redisDb.smembers(`room:${roomID}:players`)
    await ctx.redisDb.del(`room:${roomID}:players`)

    for (const playerID of players) {
      await ctx.redisDb.srem(`user:${playerID}:playing_rooms`, roomID)
    }
  })
