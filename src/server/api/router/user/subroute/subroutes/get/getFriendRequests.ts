import { loggedUserProducure } from '../../../../../procedure'
import { redisDb } from '@/db/redis'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getFriendRequests = loggedUserProducure.query(async ({ ctx }) => {
  const sessionUserID = ctx.session.user.userId

  const requestedUserIDs = await redisDb.smembers(
    `user:${sessionUserID}:incoming_friend_requests`,
  )

  if (requestedUserIDs[0]) {
    const requestedUsers = await Promise.all(
      requestedUserIDs.map(async (ID) => {
        const userResult = await ctx.db
          .select({
            id: user.id,
            profilePicture: user.profilePicture,
            usernameWithUsernameID: user.usernameWithUsernameID,
          })
          .from(user)
          .where(eq(user.id, ID))
          .limit(1)

        return userResult[0]
      }),
    )

    return requestedUsers
  }

  return null
})
