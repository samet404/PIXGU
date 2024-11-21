import { joinedUserProducure } from '@/procedure';
import { z } from 'zod';

export const isRoomHavePassword = joinedUserProducure
  .input(z.object({ roomID: z.string().cuid2() }))
  .query(async ({ ctx, input }) =>
    // check if room has password
    (await ctx.redisDb.exists(`room:${input.roomID}:password`) === 1)
  )