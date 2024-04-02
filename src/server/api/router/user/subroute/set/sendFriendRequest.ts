import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { pusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'

export const sendFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const friendID = input.ID
    const userID = ctx.user.id

    await redisDb.sadd(`user:${friendID}:incoming_friend_requests`, userID)

    await pusherServer.trigger(
      toPusherKey(`incoming_friend_requests:${friendID}`),
      'refetch_requests',
      null,
    )
  })
