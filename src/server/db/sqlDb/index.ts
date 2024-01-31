import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { env } from '@/env/server.mjs'

import * as schema from './schema'

export const pool = new Pool({ connectionString: env.SQL_DATABASE_URL })

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
