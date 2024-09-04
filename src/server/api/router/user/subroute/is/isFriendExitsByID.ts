import { z } from 'zod'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '@/procedure'

export const isFriendExitsByID = loggedUserProducure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    // const userID = ctx.user.id

    // const friendResult = await ctx.db.query.user.findFirst({
    //   where: eq(user.id, userID),
    //   columns: {},
    //   with: {
    //     friend: {
    //       where: (friend, { eq }) => eq(friend.friendID, input),
    //       columns: {
    //         ID: true,
    //       },
    //     },
    //   },
    // })

    // if (!friendResult?.friend) return false
    // if (!friendResult.friend[0]) return false
    return true
  })
