import { user } from '@/schema/user'
import { publicProcedure } from '@/server/api/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const isUserExitsByUsernameWithUsernameID = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    // const userResult = await ctx.db
    //   .select({})
    //   .from(user)
    //   .where(eq(user.usernameWithUsernameID, input))
    //   .limit(1)
    // console.log(userResult)
    // if (userResult[0]) return true
    // return false
  })
