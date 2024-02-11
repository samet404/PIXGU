import type { Config } from 'drizzle-kit'
import { env } from '@/env/server.mjs'

export default {
  
  schema: './src/server/db/sqlDb/schema',
  out: './src/server/db/sqlDb',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.SQL_DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config
