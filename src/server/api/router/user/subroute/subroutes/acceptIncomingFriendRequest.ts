import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'
import { redisDb } from '@/db/redis'
import { TRPCError } from '@trpc/server'
import { userFriendship } from '@/schema/user'
import { pusherServer } from '@/src/pusher/server'

export const acceptIncomingFriendRequest = loggedUserProducure
  .input(
    z.object({
      ID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      await pusherServer.trigger('incoming_friend_requests', 'refetch_requests', null)
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message)
    }
  
    // const sessionUserID = ctx.session.user.userId

    // const isFriendExits = await redisDb.smismember(
    //   `user:${sessionUserID}:incoming_friend_requests`,
    //   [input.ID],
    // )
    // console.log(isFriendExits)
    // if (isFriendExits[0] != 1) throw new TRPCError({ code: 'NOT_FOUND' })

    // await ctx.db.insert(userFriendship).values({
    //   userID: sessionUserID,
    //   friendID: input.ID,
    // })

    // await ctx.db.insert(userFriendship).values({
    //   userID: input.ID,
    //   friendID: sessionUserID,
    // })
  })
