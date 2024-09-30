import { loggedUserProducure } from '@/procedure'

export const getAll = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id
  const developerMode = await ctx.redisDb.get(
    `user:${ctx.user.id}:settings:developer_mode`,
  )
  // const musicPlayer = await ctx.redisDb.get(
  //   `user:${userID}:settings:music_player`,
  // )

  // const musicPlayerLinks = await ctx.redisDb.get(
  //   `user:${userID}:settings:music_player_links`,
  // )

  return {
    developerMode: developerMode === '1',
  }
})
