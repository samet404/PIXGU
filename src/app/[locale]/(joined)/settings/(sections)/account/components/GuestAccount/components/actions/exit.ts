'use server'

import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const exit = async () => {
  'use server'
  const guestAuthToken = cookies().get('guest-auth-token')?.value
  if (guestAuthToken) {
    z.string().min(10).cuid2().parse(guestAuthToken)

    const guestID = await redisDb.get(`guest:token:${guestAuthToken}:ID`)
    await redisDb.del(`guest:token:${guestAuthToken}:ID`)
    await redisDb.del(`guest:${guestID}:name`)
    await redisDb.del(`guest:${guestID}:name_ID`)
    await redisDb.del(`guest:${guestID}:name_&_name_ID`)
    cookies().delete('guest-auth-token')
  }

  redirect('/')
}
