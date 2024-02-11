import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'

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
  })
