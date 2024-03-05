import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'
import { and, eq } from 'drizzle-orm'
import { chat } from '@/schema/chat'
import { withCursorPagination } from 'drizzle-pagination'
import { TRPCError } from '@trpc/server'

export const getPrevChatMessages = loggedUserProducure
  .input(
    z.object({
      friendID: z.string().min(1).max(128).nullish(),
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(50).default(30),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { friendID, cursor, limit } = input
    if (!friendID)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'friendID is required',
      })

    const userID = await ctx.session.user.userId

    const messagesData = await ctx.db.query.chat.findMany(
      withCursorPagination({
        where: and(eq(chat.toFriendID, friendID), eq(chat.fromID, userID)),
        limit,
        cursors: [[chat.time, 'desc', cursor ? new Date(cursor) : undefined]],
      }),
    )

    return {
      messagesData,
      nextCursor: messagesData.length
        ? messagesData[messagesData.length - 1]!.time
        : null,
    }
  })
