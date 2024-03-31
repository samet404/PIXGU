import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { api } from '@/trpc/server'
import { eq } from 'drizzle-orm'

export const getPlayingRoom = loggedUserProducure.query(async ({ ctx }) => {
  const userID = (await api.auth.getUserID.query()) as string

  const room = await ctx.db
    .select({
      playingRoomID: user.playingRoomID,
    })
    .from(user)
    .where(eq(user.id, userID))
    .limit(1)

  return room[0]?.playingRoomID
})
