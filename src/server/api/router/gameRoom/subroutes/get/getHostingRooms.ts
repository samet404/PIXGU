import { loggedUserProducure } from '@/procedure'

export const getHostingRooms = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id

  return await ctx.redisDb.smembers(`user:${userID}:playing_rooms`)
})
