import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { api } from '@/trpc/server'
import { eq } from 'drizzle-orm'

export const setPlayingRoomIDToNull = loggedUserProducure.mutation(
  async ({ ctx }) => {
    const userID = ctx.user.id

    await ctx.db
      .update(user)
      .set({ playingRoomID: null })
      .where(eq(user.id, userID))
  },
)
