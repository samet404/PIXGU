import { publicProcedure } from '@/server/api/trpc'
import { cookies } from 'next/headers'

export const isJoined = publicProcedure.query(async ({ ctx }) => {
  if (ctx.user) return true

  const guestAuthToken = cookies().get('guest-auth-token')?.value
  console.log('guestAuthToken: ', guestAuthToken)
  if (!guestAuthToken) return false

  const ID = await ctx.redisDb.get(`guest:token:${guestAuthToken}:ID`)
  if (!ID) return false

  return true
})
