import { loggedUserProducure } from '@/procedure'

export const getRandomRoomID = loggedUserProducure.query(
  async ({ ctx }) => await ctx.redisDb.srandmember(`active_rooms`),
)
