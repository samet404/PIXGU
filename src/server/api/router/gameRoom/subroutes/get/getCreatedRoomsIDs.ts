import { joinedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'

export const getCreatedRoomsIDs = joinedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.isGuest && ctx.guest!.ID
  if (!userID) throw new TRPCError({ code: 'UNAUTHORIZED' })
  const roomsIDs = await ctx.redisDb.smembers(`created_rooms:user:${userID}`)

  return roomsIDs
})
