import { drizzle } from 'drizzle-orm/neon-serverless'
// import { getXataClient } from '@/xata'
import { Pool } from '@neondatabase/serverless'

import * as schema from './schema'

// const xata = getXataClient()

export const pool = new Pool({
  connectionString: process.env.XATA_URL!,
  ssl: true,
})

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
