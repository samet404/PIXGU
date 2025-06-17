import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'

export const loggedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    throw new TRPCError({
      code: 'NOT_IMPLEMENTED',
      message: 'Auth system not implemented'
    })
  },
)
