import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '../../../../procedure'

export const getFirstFriendUsernameWithUsernameID = loggedUserProducure.query(async ({ ctx }) => {
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
  const firstFriendUsernameWithUsernameID = await ctx.db.query.user.findFirst({
    where: eq(user.id, userID),
    columns: {},
    with: {
      friend: {
        limit: 1,
        columns: {
          friendUsernameWithUsernameID: true,
        },
      },
    },
  })

  return firstFriendUsernameWithUsernameID?.friend[0]?.friendUsernameWithUsernameID
})
