import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { pusherServer } from '@/src/pusher/server'

export const declineIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      await pusherServer.trigger('friend_requests', 'refetch_requests', 'null')
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message)
    }

    const sessionUserID = ctx.session.user.userId

    await redisDb.srem(
      `user:${sessionUserID}:incoming_friend_requests`,
      input.ID,
    )
  })
