import { loggedUserProducure } from '@/procedure'
import { getPusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const pusherGameRoom = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().cuid2(),
      socketId: z.string(),
      channelName: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID, socketId, channelName } = input
    const pusherServer = getPusherServer()
    const user = ctx.user
    const userID = user.id

    const isUserHost =
      (await ctx.redisDb.get<string>(`room:${roomID}:host_ID`)) === user.id

    // if (!isUserHost)
    //   if (
    //     !channelName.startsWith(
    //       toPusherKey(`private-room_${roomID}:connect_to_player:${userID}`),
    //     ) ||
    //     channelName !==
    //       toPusherKey(`presence-private-room_${roomID}:connect_to_host`)
    //   )
    //     throw new TRPCError({
    //       code: 'UNAUTHORIZED',
    //       message: 'Unauthorized channel name',
    //     })

    // if (isUserHost)
    //   if (
    //     channelName !== toPusherKey(`private-room_${roomID}:connect_to_host`) ||
    //     channelName !==
    //       toPusherKey(`presence-private-room_${roomID}:connect_to_host`)
    //   )
    //     throw new TRPCError({
    //       code: 'UNAUTHORIZED',
    //       message: 'Unauthorized channel name',
    //     })

    const isPresenceChannel = channelName.startsWith('presence-')

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channelName,
      isPresenceChannel
        ? {
            user_id: user.id,
            user_info: {
              profilePicture: user.profilePicture,
              username: user.username,
              usernameID: user.usernameID,
              usernameWithUsernameID: user.usernameWithUsernameID,
            },
          }
        : undefined,
    )

    return authResponse
  })
