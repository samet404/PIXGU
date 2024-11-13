import { joinedUserProducure } from '@/procedure'

export const getRandomPublicRoomID = joinedUserProducure.query(
  async ({ ctx }) => await ctx.redisDb.srandmember(`active_public_rooms`),
)
