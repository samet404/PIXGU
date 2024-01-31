import { TRPCError } from '@trpc/server'
import { publicProcedure } from '../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getFriends = publicProcedure.query(async ({ ctx }) => {
  const userId = await ctx.session.user.userId

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
  const mainDbAddedFriendsIDs = await ctx.db.query.user.findFirst({
    where: eq(user.id, ctx.session.user.userId),
    columns: {},
    with: {
      friends: {
        columns: {
          friendID: true,
        },
      },
    },
  })

  if (!mainDbAddedFriendsIDs) {
    throw new TRPCError({
      message: 'Something went wrong :/',
      code: 'NOT_FOUND',
    })
  }
  if (!mainDbAddedFriendsIDs?.friends)
    throw new TRPCError({
      message: 'Something went wrong :/',
      code: 'NOT_FOUND',
    })

  const mainDbAddedFriends = await Promise.all(
    mainDbAddedFriendsIDs.friends.map(async (friend) => {
      if (!friend.friendID)
        throw new TRPCError({
          message: 'Something went wrong :/',
          code: 'NOT_FOUND',
        })

      const friendResult = await ctx.db
        .select({
          id: user.id,
          username: user.username,
        })
        .from(user)
        .where(eq(user.id, friend.friendID))
        .limit(1)

      return friendResult[0]
    }),
  )

  return mainDbAddedFriends
})
