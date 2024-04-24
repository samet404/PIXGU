'use server'

import { redisDb } from '@/db/redis'

export const test = async () =>
  await redisDb.set('selamlar', Math.random().toString())
