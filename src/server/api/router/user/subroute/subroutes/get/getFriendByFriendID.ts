import { user, userFriendship } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '../../../../../procedure'
import { z } from 'zod'

export const getFriendByFriendID = loggedUserProducure
  .input(z.string().max(128).nullish())
  .query(async ({ input, ctx }) => {
    if (!input) return null

    const userID = await ctx.session.user.userId

    const userWithFriendColumnWithID = await ctx.db.query.user.findFirst({
      where: eq(user.id, userID),
      columns: {},
      with: {
        friend: {
          where: eq(userFriendship.friendID, input),
          limit: 1,
          columns: {
            ID: true,
          },
        },
      },
    })

    if (!userWithFriendColumnWithID?.friend[0]) return null

    const friend = await ctx.db
      .select()
      .from(user)
      .where(eq(user.id, input))
      .limit(1)

    return friend[0]
  })
