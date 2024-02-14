import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { pusherServer } from '@/src/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'

export const sendFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const friendID = input.ID
    const sessionUserID = ctx.session.user.userId

    await redisDb.sadd(
      `user:${friendID}:incoming_friend_requests`,
      sessionUserID,
    )

    await pusherServer.trigger(
      toPusherKey(`incoming_friend_requests:${friendID}`),
      'refetch_requests',
      null,
    )
  })
