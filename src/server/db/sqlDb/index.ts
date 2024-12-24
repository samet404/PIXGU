import 'server-only'

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '@/env/server'

export const db = drizzle(env.NEON_DATABASE_URL, {
  schema,
  logger: true,
})