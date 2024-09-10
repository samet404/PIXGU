import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const articleCategory = pgTable('article_category', {
  id: createCuid2().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
})
