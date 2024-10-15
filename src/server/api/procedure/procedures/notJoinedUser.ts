import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@/server/api/trpc'
import { cookies } from 'next/headers'

export const notJoinedUserProducure = publicProcedure.use(
  async ({ next, ctx, path, type }) => {
    let result
    if (ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })

    const guestAuthToken = cookies().get('guest-auth-token')?.value
    if (!guestAuthToken) result = await next()

    const ID = await ctx.redisDb.get(`guest:${guestAuthToken}:ID`)
    if (!ID) result = await next()

    throw new TRPCError({ code: 'UNAUTHORIZED' })
  },
)
