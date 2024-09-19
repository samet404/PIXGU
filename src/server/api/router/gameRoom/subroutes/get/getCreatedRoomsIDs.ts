import { loggedUserProducure } from '@/procedure'

export const getCreatedRoomsIDs = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id
  const roomsIDs = await ctx.redisDb.smembers(`user:${userID}:created_rooms`)

  return roomsIDs
})
