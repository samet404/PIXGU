import { createCuid2 } from '@/db/sqlDb/utils'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { user } from '../user'

export const blockedUser = pgTable('blocked_user', {
  ID: createCuid2(),
  blockedByID: varchar('blocked_by_ID', { length: 128 }).references(
    () => user.id,
  ),
  blockedID: varchar('blocked_ID', { length: 128 }).references(() => user.id),
})
