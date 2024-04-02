import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { pusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'

export const declineIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id

    await redisDb.srem(`user:${userID}:incoming_friend_requests`, input.ID)

    await pusherServer.trigger(
      toPusherKey(`incoming_friend_requests:${userID}`),
      'refetch_requests',
      null,
    )
  })
