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
    const { roomID, pass } = input

    const isExits = await ctx.redisDb.sismember('active_rooms', roomID)
    if (isExits === 0)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'ROOM_NOT_FOUND' })

    const isBlocked = await ctx.redisDb.sismember(
      `room:${roomID}:blocked_players`,
      ctx.user.id,
    )

    if (isBlocked === 1)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'BLOCKED',
      })

    const userID = ctx.user.id

    const passRoomMatch = await ctx.redisDb.get(`room:${roomID}:password`)
    const isPassTrue = passRoomMatch == pass

    console.log(`knowRoomPass isPassTrue: ${isPassTrue}`)
    if (!isPassTrue) wrongPasswordErr()

    await ctx.redisDb.sadd(`room:${roomID}:players_known_pass`, userID)

    return true
  })
