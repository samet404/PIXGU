import { env } from '@/env/server'
import Redis from 'ioredis'

// Only create Redis connection if not in build environment
export const redisDb = (!process.env.SKIP_ENV_VALIDATION
  ? new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT ? parseInt(env.REDIS_PORT) : undefined,
    password: env.REDIS_PASSWORD,
  })
  : null) as Redis

if (redisDb) {
  redisDb.on('error', (err) => {
    throw new Error(`Redis connection error: `, err)
  })
}
