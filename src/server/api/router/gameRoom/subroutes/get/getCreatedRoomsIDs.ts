import { joinedUserProducure } from '@/procedure'

export const getCreatedRoomsIDs = joinedUserProducure.query(async ({ ctx }) => {
  console.log(ctx.guest)
  const userID = ctx.isGuest ? ctx.guest!.ID : ctx.user?.id
  const roomsIDs = await ctx.redisDb.smembers(`created_rooms:user:${userID}`)

  return roomsIDs
})
