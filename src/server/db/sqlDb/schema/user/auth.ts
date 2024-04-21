import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './user'

export const session = pgTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})
