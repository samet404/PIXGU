import { user, userFriendship } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'

export const getFirstFriendByUsernameWithUsernameID = loggedUserProducure
  .input(z.string().max(128).nullish())
  .query(async ({ input, ctx }) => {
    if (!input) return null
    console.log(input)

    const userID = ctx.user.id

    // main db
    const userWithFriendWithIDColumn = await ctx.db.query.user.findFirst({
      where: eq(user.id, userID),
      columns: {},
      with: {
        friend: {
          limit: 1,
          where: eq(userFriendship.friendUsernameWithUsernameID, input),
          columns: { friendID: true },
        },
      },
    })

    const friendID = userWithFriendWithIDColumn?.friend[0]?.friendID
    if (!friendID) return null

    const friend = await ctx.db.query.user.findFirst({
      where: eq(user.id, friendID),
      columns: {
        id: true,
        usernameWithUsernameID: true,
        profilePicture: true,
      },
    })
    console.log(typeof friend + ' dawd')
    return friend
  })
