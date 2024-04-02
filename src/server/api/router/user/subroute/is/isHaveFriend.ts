import { loggedUserProducure } from '@/procedure'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const isHaveFriend = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id

  const userWithFriend = await ctx.db.query.user.findFirst({
    where: eq(user.id, userID),
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
