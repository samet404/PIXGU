import { env } from '@/env/server'
import Redis from 'ioredis'

export const redisDb = new Redis(env.REDIS_URL)
