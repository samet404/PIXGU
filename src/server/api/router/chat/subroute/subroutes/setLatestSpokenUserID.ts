import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'

export const setLatestSpokenUserID = loggedUserProducure
  .input(z.string().optional())
  .mutation(async ({ input, ctx }) => {
    const userID = await ctx.session.user.userId

    await ctx.redisDb.set(`user:${userID}:latest_spoken_user_ID`, input)
  })
