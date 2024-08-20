import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { SimplePeerSignal } from '@/zod/schema'
import { z } from 'zod'

export const sendSignalDataToPlayer = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(100),
      playerID: z.string().max(100),
      signalData: SimplePeerSignal(z),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    console.log(ctx.headers.get('x-current-path'))
    const { roomID, playerID, signalData } = input
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

    const hostID = await ctx.redisDb.get<string>(`room:${roomID}:host_ID`)

    if (hostID !== ctx.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not the host of this room',
      })

    const pusherServer = ctx.getPusherServer()
    const { toPusherKey } = await import('@/utils')

    await pusherServer.trigger(
      toPusherKey(`private-room-${roomID}:connect_to_player:${playerID}`),
      'webRTC_signalData',
      signalData,
    )
  })
