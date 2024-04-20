import { Pool } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { getXataClient } from '@/xata/xata'

import * as schema from './schema'

const xata = getXataClient()

export const pool = new Pool({
  connectionString: xata.sql.connectionString,
  max: 10,
})

export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
})
