import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type { WebRTC_signalDataToHost } from '@/types/pusher'
import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { SimplePeerSignal } from '@/zod/schema'
import { z } from 'zod'

export const sendSignalDataToHost = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
      signalData: SimplePeerSignal(z),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID, signalData } = input
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

    const pusherServer = ctx.getPusherServer()
    const { toPusherKey } = await import('@/utils')

    const pusherSignalData: WebRTC_signalDataToHost = {
      signalData: signalData as WebRTCSignalData,
      userID: ctx.user.id,
    }

    await pusherServer.trigger(
      toPusherKey(`private-room-${roomID}:connect_to_host:${ctx.user.id}`),
      'webRTC_signal',
      pusherSignalData,
    )
  })
