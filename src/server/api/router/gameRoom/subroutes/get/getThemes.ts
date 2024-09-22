import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import z from 'zod'

export const getThemes = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().cuid2(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input

    const isRoomExists =
      (await ctx.redisDb.sismember('active_rooms', roomID)) === 1
    if (!isRoomExists)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Room not found',
      })

    const amIInRoom =
      (await ctx.redisDb.sismember(
        `room:${roomID}:active_players`,
        ctx.user.id,
      )) === 1
    if (!amIInRoom)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not in this room',
      })

    const hostID = await ctx.redisDb.get(`room:${roomID}:host_ID`)

    if (hostID !== ctx.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not the host of this room',
      })

    const themes = await ctx.redisDb.srandmember('room_themes:en', 2)
    if (!themes)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Themes not found' })

    return themes as [string, string]
  })
