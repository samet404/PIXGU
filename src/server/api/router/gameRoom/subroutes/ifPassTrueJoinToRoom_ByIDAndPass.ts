import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import { user } from '@/schema/user'
import { TRPCError } from '@trpc/server'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const wrongPasswordErr = () => {
  throw new TRPCError({ code: 'NOT_FOUND', message: 'Password is wrong' })
}

export const ifPassTrueJoinToRoom_ByIDAndPass = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
      password: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user!.id
    const { roomID, password } = input

    // get room by ID and password
    const room = await ctx.db
      .select({})
      .from(gameRoom)
      .where(and(eq(gameRoom.ID, roomID), eq(gameRoom.password, password)))
      .limit(1)

    if (!room[0]) wrongPasswordErr()
    if (room[0]) {
      // get currently playing room ID
      const userWithPlayingRoomID = await ctx.db
        .select({
          playingRoomID: user.playingRoomID,
        })
        .from(user)
        .where(eq(user.id, userID))
        .limit(1)

      // if user currently playing room, not allow to join to another room
      if (userWithPlayingRoomID[0]?.playingRoomID) wrongPasswordErr()

      // otherwise, join to room
      if (!userWithPlayingRoomID[0]?.playingRoomID)
        await ctx.db
          .update(user)
          .set({ playingRoomID: roomID })
          .where(eq(user.id, userID))
    }
  })
