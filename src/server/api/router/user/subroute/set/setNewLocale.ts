import { joinedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const setNewLocale = joinedUserProducure
  .input(z.string().min(2).max(5))
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.guest?.ID
    if (!userID) throw new TRPCError({ code: 'UNAUTHORIZED' })
    const newLocale = input

    await ctx.redisDb.set(`user:${userID}:locale`, newLocale)
  })
