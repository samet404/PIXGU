import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'
import { cookies } from 'next/headers'

export const joinedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    const start = Date.now()
    let result
    if (ctx.user) result = await next()

    const guestAuthToken = cookies().get('guest-auth-token')?.value
    if (!guestAuthToken) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const ID = await ctx.redisDb.get(`guest:${guestAuthToken}:ID`)
    if (!ID) throw new TRPCError({ code: 'UNAUTHORIZED' })

    result = await next()

    const durationMs = Date.now() - start
    const meta = { path: path, type: type, durationMs }

    result.ok
      ? console.log('OK request timing:', meta)
      : console.error('Non-OK request timing', meta)

    return result
  },
)
