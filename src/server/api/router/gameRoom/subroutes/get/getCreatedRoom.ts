import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const getCreatedRoom = loggedUserProducure
  .input(z.object({ ID: z.string().max(10).min(4) }))
  .query(async ({ ctx, input }) => {
    const userID = ctx.user.id
    const { ID } = input
    const hostID = await ctx.redisDb.get(`room:${ID}:host_ID`)

    if (hostID !== userID)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not the host of this room',
      })

    const name = await ctx.redisDb.get<string>(`room:${ID}:name`)
    const isPublic = await ctx.redisDb.get<string>(`room:${ID}:password`)
    const createdAt = await ctx.redisDb.get<Date>(`room:${ID}:created_at`)

    return {
      ID,
      name: name ?? 'name not found',
      isPublic: !isPublic,
      createdAt: createdAt ?? 'date not found',
    }
  })
