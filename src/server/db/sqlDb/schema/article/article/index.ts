import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const article = pgTable('article', {
  id: createCuid2().primaryKey(),
  headerText: varchar('headerText', { length: 191 }).notNull(),
  content: text('content').notNull(),
})
