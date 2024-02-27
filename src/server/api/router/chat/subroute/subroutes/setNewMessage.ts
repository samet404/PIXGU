import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'
import { chat } from '@/schema/chat'
import { pusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'

export const setNewMessage = loggedUserProducure
  .input(
    z.object({
      friend_ID: z.string().max(128),
      text: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = await ctx.session.user.userId
    const { friend_ID, text } = input
    const time = new Date().toISOString()

    await ctx.redisDb.json.set(
      `user:${userID}:chat:${friend_ID}`,
      '$',
      JSON.stringify({
        fromID: userID,
        text: text,
        time: time,
      }),
    )

    await pusherServer.trigger(
      toPusherKey(`user:${userID}:chat:${friend_ID}`),
      'refetch_new_message',
      null,
    )

    await pusherServer.trigger(
      toPusherKey(`user:${friend_ID}:chat:${userID}`),
      'refetch_new_message',
      null,
    )

    await ctx.db.insert(chat).values({
      fromID: userID,
      toFriendID: friend_ID,
      text: text,
      time: time,
    })
  })
