import 'server-only'
import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import type { Guest } from '@/types'
import { killGuest } from './kill'

export const validateGuest = async (): Promise<Guest | null> => {
  const authToken = cookies().get('guest_auth_session')?.value
  if (!authToken) return null

  const ID = await redisDb.get(`guest:session:${authToken}:ID`)
  if (!ID) {
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
