import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const wrongPasswordErr = () => {
  throw new TRPCError({ code: 'NOT_FOUND', message: 'Password is wrong' })
}

export const isRoomPassTrue = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
      pass: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID, pass } = input

    const passRoomMatch = await ctx.redisDb.get(`room:${roomID}:password`)
    const isPassTrue = passRoomMatch === pass

    if (!isPassTrue) wrongPasswordErr()

    return true
  })
