import type { Config } from 'drizzle-kit'
import { getXataClient } from '@/xata'
import { env } from '@/env/server.mjs'

const xata = getXataClient()

export default {
  schema: './src/server/db/sqlDb/schema',
  out: './src/server/db/sqlDb',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.NEON_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config
