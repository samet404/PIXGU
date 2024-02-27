import { loggedUserProducure } from '../../../../procedure'

export const getLatestSpokenUser = loggedUserProducure.query(
  async ({ ctx }) => {
    const userID = await ctx.session.user.userId

    const ID = await ctx.redisDb.get(`user:${userID}:latest_spoken_user_ID`)
    return ID
  },
)
