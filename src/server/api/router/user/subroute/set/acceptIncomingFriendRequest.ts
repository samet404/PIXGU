import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { TRPCError } from '@trpc/server'
import { userFriendship } from '@/schema/user'
import { pusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'

export const acceptIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string().max(128),
      friendUsernameWithUsernameID: z.string().max(70),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const usernameWithUsernameID = ctx.user.usernameWithUsernameID

    const isFriendExits = await redisDb.smismember(
      `user:${userID}:incoming_friend_requests`,
      [input.ID],
    )
    console.log(isFriendExits)
    if (isFriendExits[0] != 1) throw new TRPCError({ code: 'NOT_FOUND' })

    await ctx.db.insert(userFriendship).values({
      userID: userID,
      friendID: input.ID,
      friendUsernameWithUsernameID: input.friendUsernameWithUsernameID,
    })

    await ctx.db.insert(userFriendship).values({
      userID: input.ID,
      friendID: userID,
      friendUsernameWithUsernameID: usernameWithUsernameID,
    })

    await redisDb.srem(`user:${userID}:incoming_friend_requests`, input.ID)

    await pusherServer.trigger(
      toPusherKey(`incoming_friend_requests:${userID}`),
      'refetch_requests',
      null,
    )
  })
