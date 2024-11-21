import 'server-only'
import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import type { Guest } from '@/types'
import { killGuest } from './kill'
import { z } from 'zod'
import { wToMs } from '@/utils'

export const validateGuest = async (): Promise<Guest | null> => {
  const authToken = (await cookies()).get('guest_auth_session')?.value
  if (!authToken) return null

  const ID = await redisDb.get(`guest:session:${authToken}:ID`)
  if (!ID) {
    killGuest()
    return null
  }

  const validatedAt = await redisDb.get(`guest:${ID}:validated_at`)
  if (!validatedAt) {
    killGuest()
    return null
  }

  z.number().parse(parseInt(validatedAt))

  // kill if validated at is older than 2 weeks
  if (parseInt(validatedAt) + wToMs(2) < Date.now()) {
    killGuest()
    return null
  }

  const name = await redisDb.get(`guest:${ID}:name`)
  if (!name) return null

  const nameID = await redisDb.get(`guest:${ID}:name_ID`)
  if (!nameID) return null

  const nameWithNameID = await redisDb.get(`guest:${ID}:name_&_name_ID`)
  if (!nameWithNameID) return null

  const guest = {
    ID,
    name,
    nameID,
    nameWithNameID,
  }

  return guest
}
