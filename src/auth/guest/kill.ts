import 'server-only'

import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import { z } from 'zod'

export const killGuest = async () => {
  const authToken = cookies().get('guest_auth_session')?.value
  if (authToken) {
    z.string().min(10).cuid2().parse(authToken)

    const guestID = await redisDb.get(`guest:session:${authToken}:ID`)
    await redisDb.del(`guest:session:${authToken}:ID`)
    await redisDb.del(`guest:${guestID}:name`)
    await redisDb.del(`guest:${guestID}:name_ID`)
    await redisDb.del(`guest:${guestID}:name_&_name_ID`)
    cookies().delete('guest_auth_session')
  }
}
