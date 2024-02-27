import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'

export const setLatestSpokenUser = loggedUserProducure
  .input(z.string().max(128))
  .mutation(async ({ input, ctx }) => {
    const userID = await ctx.session.user.userId

    await ctx.redisDb.set(`user:${userID}:latest_spoken_user_ID`, input)
  })
