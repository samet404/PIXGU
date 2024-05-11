import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const isUserKnowRoomPass = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .query(async ({ input, ctx }) => {
    try {
      const userID = ctx.user.id
      const { roomID } = input

      const isKnow = await ctx.redisDb.sismember(
        `room:${roomID}:players_know_pass`,
        userID,
      )

      return isKnow === 1 ? true : false
    } catch (e) {
      if (e instanceof Error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message,
        })
      return false
    }
  })
