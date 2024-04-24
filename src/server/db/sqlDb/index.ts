import { drizzle } from 'drizzle-orm/neon-serverless'
// import { getXataClient } from '@/xata'
import { Pool } from '@neondatabase/serverless'

import * as schema from './schema'
import { env } from '@/env/server.mjs'

// const xata = getXataClient()

export const pool = new Pool({
  connectionString: env.NEON_URL,
})

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
