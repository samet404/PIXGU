import { Redis } from '@upstash/redis'
import { env } from '@/env/server.mjs'

export const redisDb = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})  