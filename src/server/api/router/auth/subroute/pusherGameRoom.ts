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
      isHostApi: z.boolean(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID, socketId, channelName, isHostApi } = input
    const pusherServer = getPusherServer()
    const user = ctx.user
    const userID = user.id

    const hostID = await ctx.redisDb.get<string>(`room:${roomID}:host_ID`)

    const isUserHost = hostID === user.id

    // if (isUserHost)
    //   if (
    //     channelName !==
    //       toPusherKey(`presence-private-room-${roomID}:connect_to_host`) &&
    //     !channelName.startsWith(
    //       toPusherKey(`private-room-${roomID}:connect_to_host`),
    //     )
    //   )
    //     throw new TRPCError({
    //       code: 'UNAUTHORIZED',
    //       message: 'Unauthorized channel name',
    //     })

    // if (!isUserHost)
    //   if (
    //     channelName !==
    //       toPusherKey(`presence-private-room-${roomID}:connect_to_host`) &&
    //     channelName !==
    //       toPusherKey(`private-room-${roomID}:connect_to_player:${userID}`)
    //   )
    //     throw new TRPCError({
    //       code: 'UNAUTHORIZED',
    //       message: 'Unauthorized channel name',
    //     })

    const isPresenceChannel =
      channelName.startsWith('private-presence-') ||
      channelName.startsWith('presence-')

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channelName,
      isPresenceChannel
        ? {
            user_id: isUserHost && isHostApi ? user.id + '-HOST' : user.id,
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
