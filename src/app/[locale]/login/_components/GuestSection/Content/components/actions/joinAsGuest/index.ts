'use server'

import { env } from '@/env/server'
import { init } from '@paralleldrive/cuid2'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { generateGuestUsernameID } from './funcs/generateGuestUsernameID'
import { TRPCError } from '@trpc/server'
import { wToS, wToMs } from '@/utils'
import { redisDb } from '@/db/redis'
import { redirect } from 'next/navigation'

const createTokenId = init({
  length: 25,
})
const createGuestId = init({
  length: 22,
})

export const joinAsGuest = async (input: { name: string }) => {
  'use server'

  z.object({
    name: z.string().trim().min(1).max(20),
  }).parse(input)

  // #region if there is already token, delete it
  const prevGuestAuthToken = cookies().get('guest-auth-token')?.value
  if (prevGuestAuthToken) {
    z.string().min(10).cuid2().parse(prevGuestAuthToken)

    const guestID = await redisDb.get(`guest:token:${prevGuestAuthToken}:ID`)
    await redisDb.del(`guest:token:${prevGuestAuthToken}:ID`)
    await redisDb.del(`guest:${guestID}:name`)
    await redisDb.del(`guest:${guestID}:name_ID`)
    await redisDb.del(`guest:${guestID}:name_&_name_ID`)
    cookies().delete('guest-auth-token')
  }
  // #endregion

  const { name } = input
  const guestAuthToken = createTokenId()
  const guestID = createGuestId()

  await redisDb.set(`guest:token:${guestAuthToken}:ID`, guestID)
  await redisDb.expire(`guest:token:${guestAuthToken}:ID`, wToS(2))

  await redisDb.set(`guest:${guestID}:name`, name)
  await redisDb.expire(`guest:${guestID}:name`, wToS(2))

  const nameID = await generateGuestUsernameID(name)
  if (!nameID)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Cannot generate name ID',
    })

  await redisDb.set(`guest:${guestID}:name_ID`, nameID)
  await redisDb.expire(`guest:${guestID}:name_ID`, wToS(2))

  await redisDb.set(`guest:${guestID}:name_&_name_ID`, `${name}@${nameID}`)
  await redisDb.expire(`guest:${guestID}:name_&_name_ID`, wToS(2))

  cookies().set('guest-auth-token', guestAuthToken, {
    maxAge: wToMs(2),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    domain: env.NODE_ENV === 'production' ? 'pixgu.com' : 'localhost',
  })

  redirect('/')
}
