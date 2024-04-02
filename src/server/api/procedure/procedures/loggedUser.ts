import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'
import type { User, Session } from 'lucia'

export const loggedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    const start = Date.now()

    const user = ctx.user
    const session = ctx.session

    if (!session || !user)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User needs to be logged in to do this',
      })

    type NewCtxWithSessionAndUserNotNull = {
      [K in keyof typeof ctx]: K extends 'user'
        ? User
        : K extends 'session'
          ? Session
          : (typeof ctx)[K]
    }

    const result = await next({
      ctx: ctx as NewCtxWithSessionAndUserNotNull,
    })

    const durationMs = Date.now() - start
    const meta = { path: path, type: type, durationMs }

    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta)

    return result
  },
)
