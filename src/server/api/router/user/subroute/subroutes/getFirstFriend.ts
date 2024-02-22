import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '../../../../procedure'
import { z } from 'zod'

export const getFirstFriend = loggedUserProducure.query(async ({ ctx }) => {
  const userID = await ctx.session.user.userId

  // redis
  // const redisAddedfriendIDs = await ctx.redisDb.smembers(
  //   `user:${userId}:friend`,
  // )

  // const redisAddedfriend = (await Promise.all(
  //   redisAddedfriendIDs.map(async (id) => {
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

  // if (!redisAddedfriend) console.error('No redis results found for friend')
  // if (redisAddedfriend) return redisAddedfriend

  // main db
  const firstFriendID = await ctx.db.query.user.findFirst({
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

  if (firstFriendID?.friend[0]?.friendID) {
    const friendResult = await ctx.db.query.user.findFirst({
      where: eq(user.id, firstFriendID?.friend[0]?.friendID),
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
