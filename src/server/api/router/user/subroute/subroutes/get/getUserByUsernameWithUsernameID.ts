import { z } from 'zod'
import { publicProcedure } from '../../../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getUserByUsernameWithUsernameID = publicProcedure
  .input(
    z.object({
      username: z.string(),
      usernameID: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { username, usernameID } = input

    const userResult = await ctx.db
      .select({
        id: user.id,
        username: user.username,
        usernameID: user.usernameID,
        usernameWithUsernameID: user.usernameWithUsernameID,
        profilePicture: user.profilePicture,
      })
      .from(user)
      .where(eq(user.usernameWithUsernameID, `${username}@${usernameID}`))
      .limit(1)

    return userResult
  })
