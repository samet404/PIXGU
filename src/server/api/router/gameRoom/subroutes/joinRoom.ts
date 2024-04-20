import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
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

    await ctx.db"
      .update(user)
      .set({ playingRoomID: roomID })
      .where(eq(user.id, userID))
  })
