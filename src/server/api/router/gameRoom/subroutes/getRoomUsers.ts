import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { api } from '@/trpc/server'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const getRoomUsers = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input
    const userID = ctx.user.id


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
      .from(user)an
      .where(eq(user.playingRoomID, playingRoomID))

    return users
  })
