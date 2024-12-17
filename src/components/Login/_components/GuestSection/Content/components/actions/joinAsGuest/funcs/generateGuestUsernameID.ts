import 'server-only'

import { redisDb } from '@/db/redis'
import { z } from 'zod'

export const generateGuestUsernameID = async (
  username: string,
): Promise<string | null> => {
  z.string().min(1).max(20).parse(username)

  const MAX_RETRY = 10
  let retry = 0
  let notUnique = true
  let ID: string | null = null

  while (notUnique) {
    if (retry > MAX_RETRY) throw new Error('Max retry exceeded 89')

    ID = Math.floor(Math.random() * 1000 + 0).toString()

    switch (ID.length) {
      case 1:
        ID = `${ID}000`
        break
      case 2:
        ID = `${ID}00`
        break
      case 3:
        ID = `${ID}0`
        break
    }

    const result = await redisDb.sadd('guest_usernames', `${username}@${ID}`)

    if (result === 1) notUnique = false
  }

  return ID
}
