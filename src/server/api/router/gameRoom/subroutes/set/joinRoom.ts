import { loggedUserProducure } from '@/procedure'
import { usersToGameRoom } from '@/schema/user'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const joinRoom = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const userID = ctx.user.id
      const { roomID } = input

      await ctx.db.insert(usersToGameRoom).values({
        userID: userID,
        gameRoomID: roomID,
      })

      await ctx.redisDb.sadd(`user:${userID}:playing_rooms`, roomID)
      await ctx.redisDb.sadd(`room:${roomID}:players`, userID)
    } catch (e) {
      if (e instanceof Error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: e.message,
        })
    }
  })
