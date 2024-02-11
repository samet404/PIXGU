import { TRPCError } from '@trpc/server'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '../../../../procedure'

export const getFriends = loggedUserProducure.query(async ({ ctx }) => {
  const userID = await ctx.session.user.userId

  // redis
  // const redisAddedFriendsIDs = await ctx.redisDb.smembers(
  //   `user:${userId}:friends`,
  // )

  // const redisAddedFriends = (await Promise.all(
  //   redisAddedFriendsIDs.map(async (id) => {
  //     const friend = await ctx.redisDb.get(`user:${id}`)
  //     return friend
  //   }),
  // )) as (
  //   | {
  //       id: string | null
  //       username: string
  //     }
  //   | undefined
  // )[]

  // if (!redisAddedFriends) console.error('No redis results found for friends')
  // if (redisAddedFriends) return redisAddedFriends

  // main db
  const mainDbAddedFriendsWithIDs = await ctx.db.query.user.findFirst({
    where: eq(user.id, userID),
    columns: {},
    with: {
      friends: {
        columns: {
          friendID: true,
        },
      },
    },
  })

  if (!mainDbAddedFriendsWithIDs?.friends[0]) return null

  const mainDbAddedFriends = await Promise.all(
    mainDbAddedFriendsWithIDs.friends.map(async (friend) => {
      if (!friend.friendID)
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'friendID not found',
        })

      const friendResult = await ctx.db
        .select({
          usernameWithUsernameID: user.usernameWithUsernameID,
        })
        .from(user)
        .where(eq(user.id, friend.friendID))
        .limit(1)

      return friendResult[0]
    }),
  )

  return mainDbAddedFriends
})
