import { publicProcedure } from '@/server/api/trpc'
import { cookies } from 'next/headers'

export const isJoined = publicProcedure.query(async ({ ctx }) => {
  const guestAuthToken = (await cookies()).get('guest_auth_session')?.value
  console.log('guestAuthToken: ', guestAuthToken)
  if (!guestAuthToken) return false

  const ID = await ctx.redisDb.get(`guest:session:${guestAuthToken}:ID`)
  if (!ID) return false

  return true
})
