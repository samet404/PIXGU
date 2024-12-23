import 'server-only'

import * as schema from './schema'
import { drizzle } from 'drizzle-orm/xata-http'
import { getXataClient } from '@/helpers/server'

export const db = drizzle(getXataClient(), {
  schema,
  logger: true,
})