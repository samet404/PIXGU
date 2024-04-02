import { z } from 'zod'
import { publicProcedure } from '@/server/api/trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getUserByUsernameAndUsernameID = publicProcedure
  .input(z.string().nullish())
  .query(async ({ ctx, input }) => {
    if (!input) return null

    const userResult = await ctx.db
      .select({
        id: user.id,
        usernameWithUsernameID: user.usernameWithUsernameID,
        profilePicture: user.profilePicture,
      })
      .from(user)
      .where(eq(user.usernameWithUsernameID, input))
      .limit(1)

    return userResult[0]
  })
