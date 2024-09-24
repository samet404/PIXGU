import { loggedUserProducure } from '@/procedure'

export const getDeveloperMode = loggedUserProducure.query(async ({ ctx }) => {
  const value = await ctx.redisDb.get(
    `user:${ctx.user.id}:settings:developer_mode`,
  )
  const isEnabled = value === '1'

  return isEnabled
})
