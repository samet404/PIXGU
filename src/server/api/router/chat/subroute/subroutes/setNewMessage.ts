import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'
import { chat } from '@/schema/chat'
import { pusherServer } from '@/pusher/server'
import { toPusherKey } from '@/utils/toPusherKey'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const setNewMessage = loggedUserProducure
  .input(
    z.object({
      friend_ID: z.string().max(128),
      text: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = await ctx.session.user.userId
    const usernameWithUsernameID = await ctx.session.user.usernameWithUsernameID

    const { friend_ID, text } = input
    const time = new Date().toISOString()

    const friendWithUsernameWithUsernameIDColumn = await ctx.db
      .select({
        usernameWithUsernameID: user.usernameWithUsernameID,
      })
      .from(user)
      .limit(1)
      .where(eq(user.id, friend_ID))

    const newMessageData = {
      fromID: userID,
      toFriendID: friend_ID,
      fromUsernameWithUsernameID: usernameWithUsernameID,
      toFriendUsernameWithUsernameID:
        friendWithUsernameWithUsernameIDColumn[0]!.usernameWithUsernameID,
      text: text,
      time: time,
    }

    await ctx.redisDb.json.set(
      `user:${userID}:chat:${friend_ID}`,
      '$',
      JSON.stringify(newMessageData),
    )

    const newMessage: {
      fromID: any
      toFriendID: string
      fromUsernameWithUsernameID: string
      toFriendUsernameWithUsernameID: string
      text: string
      time: string
    } = await ctx.redisDb.json.get(`user:${userID}:chat:${friend_ID}`)

    await pusherServer.trigger(
      toPusherKey(`user:${userID}:chat:${friend_ID}`),
      'get_new_message',
      newMessage,
    )

    await pusherServer.trigger(
      toPusherKey(`user:${friend_ID}:chat:${userID}`),
      'get_new_message',
      newMessage,
    )

    await ctx.db.insert(chat).values({
      fromID: userID,
      toFriendID: friend_ID,
      fromUsernameWithUsernameID: usernameWithUsernameID,
      toFriendUsernameWithUsernameID:
        friendWithUsernameWithUsernameIDColumn[0]!.usernameWithUsernameID,
      text: text,
      time: time,
    })
  })
