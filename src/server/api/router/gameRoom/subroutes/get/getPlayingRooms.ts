import { loggedUserProducure } from '@/procedure'

export const getPlayingRooms = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id

  return await ctx.redisDb.smembers(`user:${userID}:playing_rooms`)
})
