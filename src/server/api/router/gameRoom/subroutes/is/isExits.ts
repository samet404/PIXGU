import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
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

    if (isExits === 0)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'ROOM_NOT_FOUND',
      })

    return true
  })
