import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'
import { cookies } from 'next/headers'

export const notJoinedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    if (ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const guestAuthToken = (await cookies()).get('guest_auth_session')?.value
    if (!guestAuthToken) await next()

    const ID = await ctx.redisDb.get(`guest:${guestAuthToken}:ID`)
    if (!ID) await next()

    throw new TRPCError({ code: 'UNAUTHORIZED' })
  },
)
