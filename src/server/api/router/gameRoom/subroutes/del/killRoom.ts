import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const killRoom = loggedUserProducure
  .input(
    z.object({
      ID: z.string().max(10),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const { ID } = input
    const available = await ctx.redisDb.smembers(`user:${userID}:created_rooms`)

    if (!available.includes(input.ID))
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "You don't have permission to kill this room",
      })

    await ctx.redisDb.srem(`active_rooms`, ID)
    await ctx.redisDb.srem(`room:${ID}:active_players`, userID)
    await ctx.redisDb.del(`room:${ID}:name`)
    await ctx.redisDb.del(`room:${ID}:admins`)
    await ctx.redisDb.del(`room:${ID}:created_at`)
    await ctx.redisDb.del(`room:${ID}:host_ID`)
    await ctx.redisDb.srem(`user:${userID}:created_rooms`, ID)
    await ctx.redisDb.del(`room:${ID}:password`)
    await ctx.redisDb.del(`room:${ID}:players_known_pass`, userID)
  })
