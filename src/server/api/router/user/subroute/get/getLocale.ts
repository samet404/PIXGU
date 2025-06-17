import { publicProcedure } from '@/server/api/trpc'
import type { Locale } from '@/types/locale'

export const getLocale = publicProcedure.query(async ({ ctx, input }) => {
  const userID = ctx.guest?.ID
  if (!userID) return null
  return (await ctx.redisDb.get(`user:${userID}:locale`)) as Locale
})
