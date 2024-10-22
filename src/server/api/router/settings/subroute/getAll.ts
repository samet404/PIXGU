import { joinedUserProducure } from '@/procedure'

export const getAll = joinedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.isGuest ? ctx.guest!.ID : ctx.user!.id
  const developerMode = await ctx.redisDb.get(
    `user:${userID}:settings:developer_mode`,
  )

  console.log('developerMode: ', developerMode)
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
