import { publicProcedure } from '../../../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const isHaveFriend = publicProcedure.query(async ({ ctx }) => {
  const sessionUserID = ctx.session.user.userId

  const userWithFriend = await ctx.db.query.user.findFirst({
    where: eq(user.id, sessionUserID),
    columns: {},
    with: {
      friend: {
        columns: { ID: true },
      },
    },
  })

  if (!userWithFriend?.friend[0]) return false
  return true
})
