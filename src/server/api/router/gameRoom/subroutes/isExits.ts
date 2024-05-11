import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'

export const isExits = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input

    const isExits = await ctx.redisDb.exists(`room:${roomID}:name`)

    return isExits == 1 ? true : false
  })
