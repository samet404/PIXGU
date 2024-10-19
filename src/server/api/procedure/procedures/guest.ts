import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'

export const guestProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    const start = Date.now()

    if (!ctx.isGuest) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const result = await next()

    const durationMs = Date.now() - start
    const meta = { path: path, type: type, durationMs }

    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta)

    return result
  },
)
