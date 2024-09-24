import { loggedUserProducure } from '@/procedure'

export const getAll = loggedUserProducure.query(async ({ ctx }) => {
  const developerMode = await ctx.redisDb.get(
    `user:${ctx.user.id}:settings:developer_mode`,
  )

  return {
    developerMode: developerMode === '1',
  }
})
