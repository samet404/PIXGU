import { z } from 'zod'
import { loggedUserProducure } from '../../../../procedure'

export const getNewMessage = loggedUserProducure
  .input(z.string().max(128).nullish())
  .query(async ({ input, ctx }) => {
    if (!input) return null

    const userID = await ctx.session.user.userId

    const message = (await ctx.redisDb.json.get(
      `user:${userID}:chat:${input}`,
    )) as {
      time: string
      text: string
      ID: string
      userID: string
      friendID: string
    }
    console.log('message:', message)
    return message
  })
