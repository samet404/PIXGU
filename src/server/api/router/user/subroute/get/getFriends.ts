import { TRPCError } from '@trpc/server'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { loggedUserProducure } from '@/procedure'

export const getFriends = loggedUserProducure.query(async ({ ctx }) => {
  // const userID = ctx.user.id
  // // redis
  // // const redisAddedfriendIDs = await ctx.redisDb.smembers(
  // //   `user:${userId}:friend`,
  // // )
  // // const redisAddedfriend = (await Promise.all(
  // //   redisAddedfriendIDs.map(async (id) => {
  // //     const friend = await ctx.redisDb.get(`user:${id}`)
  // //     return friend
  // //   }),
  // // )) as (
  // //   | {
  // //       id: string | null
  // //       username: string
  // //     }
  // //   | undefined
  // // )[]
  // // if (!redisAddedfriend) console.error('No redis results found for friend')
  // // if (redisAddedfriend) return redisAddedfriend
  // // main db
  // const mainDbAddedfriendWithIDs = await ctx.db.query.user.findFirst({
  //   where: eq(user.id, userID),
  //   columns: {},
  //   with: {
  //     friend: {
  //       columns: {
  //         friendID: true,
  //       },
  //     },
  //   },
  // })
  // if (!mainDbAddedfriendWithIDs?.friend[0]) return null
  // const mainDbAddedfriend = await Promise.all(
  //   mainDbAddedfriendWithIDs.friend.map(async (friend) => {
  //     if (!friend.friendID)
  //       throw new TRPCError({
  //         code: 'UNPROCESSABLE_CONTENT',
  //         message: 'friendID not found',
  //       })
  //     const friendResult = await ctx.db
  //       .select({
  //         ID: user.id,
  //         usernameWithUsernameID: user.usernameWithUsernameID,
  //         profilePicture: user.profilePicture,
  //       })
  //       .from(user)
  //       .where(eq(user.id, friend.friendID))
  //       .limit(1)
  //     return friendResult[0]
  //   }),
  // )
  // return mainDbAddedfriend
})
