import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const wrongPasswordErr = () => {
  throw new TRPCError({ code: 'NOT_FOUND', message: 'Password is wrong' })
}

export const knowRoomPass = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
      pass: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const { roomID, pass } = input

    const passRoomMatch = await ctx.redisDb.get(`room:${roomID}:password`)
    const isPassTrue = passRoomMatch == pass

    console.log(`knowRoomPass isPassTrue: ${isPassTrue}`)
    if (!isPassTrue) wrongPasswordErr()

    await ctx.redisDb.sadd(`room:${roomID}:players_know_pass`, userID)

    return true
  })
