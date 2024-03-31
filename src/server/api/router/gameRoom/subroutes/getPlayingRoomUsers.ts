import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { api } from '@/trpc/server'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'

export const getPlayingRoomUsers = loggedUserProducure.query(
  async ({ ctx }) => {
    const userID = (await api.auth.getUserID.query()) as string

    const userWithPlayingRoomID = await ctx.db
      .select({
        playingRoomID: user.playingRoomID,
      })
      .from(user)
      .where(eq(user.id, userID))
      .limit(1)

    const playingRoomID = userWithPlayingRoomID[0]?.playingRoomID

    if (!playingRoomID)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User is not in a room',
      })

    const users = await ctx.db
      .select({
        userID: user.id,
        username: user.username,
        profilePicture: user.profilePicture,
      })
      .from(user)
      .where(eq(user.playingRoomID, playingRoomID))

    return users
  },
)
