import { usernameId } from '@/schema/user'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const testRouter = createTRPCRouter({
  usernameId: publicProcedure.mutation(async ({ ctx }) => {
    const createUsernameId = await ctx.db.insert(usernameId).values({})
    return 'createUsernameId.insertId'
  }),
})
