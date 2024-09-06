import * as schema from './schema'
import { env } from '@/env/server'
import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

export const client = new Client({
  connectionString: env.POSTGRES_URL,
})

await client.connect()

export const db = drizzle(client, {
  schema: {
    ...schema,
  },
})
