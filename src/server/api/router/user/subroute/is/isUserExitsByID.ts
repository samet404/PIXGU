import { z } from 'zod'
import { publicProcedure } from '@/server/api/trpc'

export const isUserExitsByID = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    // const userResult = await ctx.db
    //   .select({})
    //   .from(user)
    //   .where(eq(user.id, input))
    //   .limit(1)
    // console.log(userResult)
    // if (userResult[0]) return true
    // return false
  })
