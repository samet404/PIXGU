import { joinedUserProducure, loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const getCreatedRoom = joinedUserProducure
  .input(z.object({ ID: z.string().max(10).min(4) }))
  .query(async ({ ctx, input }) => {
    const userID = (() => {
      if (ctx.isGuest) return ctx.guest!.ID
      return ctx.user!.id
    })()
    const { ID } = input
    const hostID = await ctx.redisDb.get(`room:${ID}:host_ID`)

    if (hostID !== userID)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not the host of this room',
      })

    const name = await ctx.redisDb.get(`room:${ID}:name`)
    if (!name)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' })

    const password = await ctx.redisDb.get(`room:${ID}:password`)

    const createdAt = await ctx.redisDb.get(`room:${ID}:created_at`)
    if (!createdAt)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' })

    return {
      ID,
      name,
      password,
      createdAt: new Date(createdAt),
    }
  })
