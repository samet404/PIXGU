import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'

export const getClientID = async () => {
  const authToken = (await cookies()).get('guest_auth_session')?.value
  const guestID = await redisDb.get(`guest:session:${authToken}:ID`)

  if (guestID) return guestID

  return null
}
