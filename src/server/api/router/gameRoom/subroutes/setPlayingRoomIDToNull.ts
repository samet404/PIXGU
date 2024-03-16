import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const setPlayingRoomIDToNull = loggedUserProducure.mutation(
  async ({ ctx }) => {
    const userID = ctx.session.user.userId

    await ctx.db
      .update(user)
      .set({ playingRoomID: null })
      .where(eq(user.id, userID))
  },
)
