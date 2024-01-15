import { TRPCError } from '@trpc/server'
import { publicProcedure } from '../trpc'

export const loggedUserProducure = publicProcedure.use(
  async ({ ctx, next }) => {
    if (!(await ctx.session)) throw new TRPCError({ code: 'UNAUTHORIZED' })

    return await next()
  },
)
