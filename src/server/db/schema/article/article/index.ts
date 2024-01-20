import { createCuid2 } from '../../../utils/createCuid2'
import { mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'

export const article = mysqlTable('article', {
  id: createCuid2().primaryKey(),
  headerText: varchar('headerText', { length: 191 }).notNull(),
  content: text('content').notNull(),
})