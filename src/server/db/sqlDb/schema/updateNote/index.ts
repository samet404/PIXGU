import { char, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const updateNote = pgTable('update_note', {
  IDAndVersion: char('ID_&_Version', { length: 4 }).primaryKey(),
  text: text('text').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
})
