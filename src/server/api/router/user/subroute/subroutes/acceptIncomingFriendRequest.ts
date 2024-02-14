import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { TRPCError } from '@trpc/server'
import { userFriendship } from '@/schema/user'
import { pusherServer } from '@/src/pusher/server'
import { toPusherKey } from '@/src/utils/toPusherKey'

export const acceptIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string().max(128),
      friendUsernameWithUsernameID: z.string().max(70),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const sessionUserID = ctx.session.user.userId
    const sessionUsernameWithUsernameID =
      ctx.session.user.usernameWithUsernameID

    const isFriendExits = await redisDb.smismember(
      `user:${sessionUserID}:incoming_friend_requests`,
      [input.ID],
    )
    console.log(isFriendExits)
    if (isFriendExits[0] != 1) throw new TRPCError({ code: 'NOT_FOUND' })

    await ctx.db.insert(userFriendship).values({
      userID: sessionUserID,
      friendID: input.ID,
      friendUsernameWithUsernameID: input.friendUsernameWithUsernameID,
    })

    await ctx.db.insert(userFriendship).values({
      userID: input.ID,
      friendID: sessionUserID,
      friendUsernameWithUsernameID: sessionUsernameWithUsernameID,
    })

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
