import { loggedUserProducure } from '@/procedure'

export const getRandomPublicRoomID = loggedUserProducure.query(
  async ({ ctx }) =>
    await ctx.redisDb.srandmember<string>(`active_public_rooms`),
)
