import { z } from 'zod'
import { publicProcedure } from '../../../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const isFriendExitsByUsernameWithUsernameID = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const sessionUserID = ctx.session.user.userId

    const friendResult = await ctx.db.query.user.findFirst({
      where: eq(user.id, sessionUserID),
      columns: {},
      with: {
        friend: {
          where: (friend, { eq }) =>
            eq(friend.friendUsernameWithUsernameID, input),
          columns: {
            ID: true,
          },
        },
      },
    })

    if (!friendResult?.friend) return false
    if (!friendResult.friend[0]) return false
    return true
  })
