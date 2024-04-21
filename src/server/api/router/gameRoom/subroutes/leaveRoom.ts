import { loggedUserProducure } from '@/procedure'
import { usersToGameRoom } from '@/schema/user'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const leaveRoom = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID } = input
    const userID = ctx.user.id

    await ctx.db
      .delete(usersToGameRoom)
      .where(
        and(
          eq(usersToGameRoom.userID, userID),
          eq(usersToGameRoom.gameRoomID, roomID),
        ),
      )

    await ctx.redisDb.srem(`user:${userID}:playing_rooms`, roomID)
    await ctx.redisDb.srem(`room:${roomID}:players`, userID)
  })
