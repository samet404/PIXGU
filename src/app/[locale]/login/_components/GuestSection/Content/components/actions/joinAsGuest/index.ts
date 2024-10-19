'use server'

import { env } from '@/env/server'
import { init } from '@paralleldrive/cuid2'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { generateGuestUsernameID } from './funcs/generateGuestUsernameID'
import { TRPCError } from '@trpc/server'
import { wToMs } from '@/utils'
import { redisDb } from '@/db/redis'
import { redirect } from 'next/navigation'
import { killGuest } from '@/auth/guest'

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

  killGuest()

  const { name } = input
  const guestAuthToken = createTokenId()
  const guestID = createGuestId()

  const nameID = await generateGuestUsernameID(name)
  if (!nameID)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Cannot generate name ID',
    })

  const redisKeys = {
    IDBySession: `guest:session:${guestAuthToken}:ID`,
    name: `guest:${guestID}:name`,
    nameID: `guest:${guestID}:name_ID`,
    nameWithNameID: `guest:${guestID}:name_&_name_ID`,
    createdAt: `guest:${guestID}:created_at`,
    validatedAt: `guest:${guestID}:validated_at`,
  }

  await redisDb.set(redisKeys.IDBySession, guestID)
  await redisDb.set(redisKeys.name, name)
  await redisDb.set(redisKeys.nameID, nameID)
  await redisDb.set(redisKeys.nameWithNameID, `${name}@${nameID}`)

  const now = Date.now()
  await redisDb.set(redisKeys.createdAt, now)
  await redisDb.set(redisKeys.validatedAt, now)

  cookies().set('guest_auth_session', guestAuthToken, {
    maxAge: wToMs(2),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    domain: env.NODE_ENV === 'production' ? 'pixgu.com' : 'localhost',
  })

  redirect('/')
}
