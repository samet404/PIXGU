import { joinedUserProducure } from '@/procedure'
import { z } from 'zod'

export const setNewLocale = joinedUserProducure
  .input(z.string().min(2).max(5))
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.isGuest ? ctx.guest!.ID : ctx.user!.id
    const newLocale = input

    await ctx.redisDb.set(`user:${userID}:locale`, newLocale)
  })
