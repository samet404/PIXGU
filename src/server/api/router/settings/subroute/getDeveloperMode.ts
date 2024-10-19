import { joinedUserProducure } from '@/procedure'

export const getDeveloperMode = joinedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.isGuest ? ctx.guest!.ID : ctx.user!.id

  const value = await ctx.redisDb.get(`user:${userID}:settings:developer_mode`)
  const isEnabled = value === '1'

  return isEnabled
})
