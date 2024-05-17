import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'

export const setNewLocale = loggedUserProducure
  .input(z.string().min(2).max(5))
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const newLocale = input

    await ctx.redisDb.set(`locale:${userID}`, newLocale)
  })
