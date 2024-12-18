import { joinedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import z from 'zod'

export const getThemes = joinedUserProducure
  .input(
    z.object({
      roomID: z.string().cuid2(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input
    const clientID = ctx.isGuest ? ctx.guest!.ID : ctx.user!.id

    const isRoomExists =
      (await ctx.redisDb.sismember('active_rooms', roomID)) === 1
    if (!isRoomExists)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Room not found',
      })

    const hostID = await ctx.redisDb.get(`room:${roomID}:host_ID`)

    if (hostID !== clientID)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not the host of this room',
      })

    const themes = await ctx.redisDb.srandmember('room_themes:en', 2)
    if (!themes)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Themes not found' })

    return themes as [string, string]
  })
