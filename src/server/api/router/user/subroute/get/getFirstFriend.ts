import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '@/procedure'

export const getFirstFriend = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id

  const userFirstFriendWithIDColumn = await ctx.db.query.user.findFirst({
    where: eq(user.id, userID),
    columns: {},
    with: {
      friend: {
        limit: 1,
        columns: {
          friendID: true,
        },
      },
    },
  })

  const userFirstFriendWithID = userFirstFriendWithIDColumn?.friend[0]?.friendID

  if (userFirstFriendWithID) {
    const friendResult = await ctx.db.query.user.findFirst({
      where: eq(user.id, userFirstFriendWithID),
      columns: {
        id: true,
        usernameWithUsernameID: true,
        profilePicture: true,
      },
    })

    return friendResult
  }

  return undefined
})
