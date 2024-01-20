import { TRPCError } from '@trpc/server'
import { publicProcedure } from '../trpc'

export const loggedUserProducure = publicProcedure.use(
  async ({ next, ctx }) => {
    if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' })
    return await next()
  },
)
