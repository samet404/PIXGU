import { publicProcedure } from '@/server/api/trpc'
import type { Locale } from '@/types/locale'

export const getLocale = publicProcedure.query(async ({ ctx, input }) => {
  const userID = ctx.user?.id
  console.log('getLocale', ctx.user)

  console.log('userID', userID)
  if (!userID) return null
  return (await ctx.redisDb.get(`${userID}:locale`)) as Locale
})
