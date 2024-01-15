import { defineConfig } from 'drizzle-kit'
import { env } from '@/env/server.mjs'

export default defineConfig({
  schema: './src/server/db/schema',
  out: './src/db',
  driver: 'mysql2',
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
})
