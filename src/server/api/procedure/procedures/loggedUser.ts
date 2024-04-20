import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'
import type { User, Session } from 'lucia'
import type { OverrideProps } from '@/types/overrideProps'

export const loggedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    const start = Date.now()

    if (!ctx.session)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User needs to be logged in to do this',
      })

    const result = await next({
      ctx: ctx as OverrideProps<
        OverrideProps<typeof ctx, { session: Session }>,
        {
          user: User
        }
      >,
    })

    const durationMs = Date.now() - start
    const meta = { path: path, type: type, durationMs }

    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta)

    return result
  },
)
