import type { Config } from 'drizzle-kit'
import { env } from '@/env/server'

export default {
  schema: './src/server/db/sqlDb/schema',
  out: './src/server/db/sqlDb',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config
