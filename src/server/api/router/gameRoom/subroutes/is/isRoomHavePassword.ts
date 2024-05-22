import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'

export const isRoomHavePassword = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input

    return (await ctx.redisDb.get(`room:${roomID}:password`)) ? true : false
  })
