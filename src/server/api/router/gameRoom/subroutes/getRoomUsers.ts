import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
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

    const usersIDs = await ctx.redisDb.smembers(`room:${roomID}:players`)

    const users = usersIDs.map(async (userID) => {
      return await ctx.db
        .select({
          id: user.id,
          username: user.username,
        })
        .from(user)
        .where(eq(user.id, userID))
    })

    return users
  })
