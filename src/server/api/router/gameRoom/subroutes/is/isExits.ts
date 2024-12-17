import { publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'

export const isExits = publicProcedure
  .input(
    z.object({
      roomID: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input

    const isExits = await ctx.redisDb.exists(`room:${roomID}:name`)

    if (isExits === 0) return false
    return true
  })
