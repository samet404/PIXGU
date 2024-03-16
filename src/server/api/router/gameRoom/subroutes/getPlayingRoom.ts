import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getPlayingRoom = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.session.user.userId

  const room = await ctx.db
    .select({
      playingRoomID: user.playingRoomID,
    })
    .from(user)
    .where(eq(user.id, userID))
    .limit(1)

  return room[0]?.playingRoomID
})
