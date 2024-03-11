import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'
import { and, eq } from 'drizzle-orm'
import { chat } from '@/schema/chat'

export const getPrevChatMessages = loggedUserProducure
  .input(z.string().max(128))
  .query(async ({ input, ctx }) => {
    const userID = await ctx.session.user.userId

    const messages = await ctx.db
      .select()
      .from(chat)
      .where(and(eq(chat.toFriendID, input), eq(chat.fromID, userID)))

    return messages
  })
