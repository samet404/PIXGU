import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const joinRoom = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const { roomID } = input

    const userWithPlayingRoomID = await ctx.db
      .select({
        playingRoomID: user.playingRoomID,
      })
      .from(user)
      .where(eq(user.id, userID))
      .limit(1)

    if (userWithPlayingRoomID[0]?.playingRoomID)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are already in a another room',
      })

    await ctx.db
      .update(user)
      .set({ playingRoomID: roomID })
      .where(eq(user.id, userID))
  })
