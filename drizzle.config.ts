import { defineConfig } from 'drizzle-kit'

const env = process.env

export default defineConfig({
  schema: './src/db/schema',
  out: './src/db',
  driver: 'mysql2',
  dbCredentials: {
    uri: env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
