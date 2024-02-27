import { loggedUserProducure } from '../../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { pusherServer } from '@/src/pusher/server'
import { toPusherKey } from '@/src/utils/toPusherKey'

export const declineIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const sessionUserID = ctx.session.user.userId

    await redisDb.srem(
      `user:${sessionUserID}:incoming_friend_requests`,
      input.ID,
    )

    await pusherServer.trigger(
      toPusherKey(`incoming_friend_requests:${sessionUserID}`),
      'refetch_requests',
      null,
    )
  })
