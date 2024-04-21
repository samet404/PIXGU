import { loggedUserProducure } from '@/procedure'
import { usersToGameRoom } from '@/schema/user'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const wrongPasswordErr = () => {
  throw new TRPCError({ code: 'NOT_FOUND', message: 'Password is wrong' })
}

export const joinRoomWithPass = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
      pass: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const { roomID, pass } = input

    const isPassTrue = (await ctx.redisDb.get(
      `room:${roomID}:password:${pass}`,
    ))
      ? true
      : false

    if (!isPassTrue) wrongPasswordErr()

    await ctx.db.insert(usersToGameRoom).values({
      userID: userID,
      gameRoomID: roomID,
    })

    await ctx.redisDb.sadd(`user:${userID}:playing_rooms`, roomID)
    await ctx.redisDb.sadd(`room:${roomID}:players`, userID)
  })
