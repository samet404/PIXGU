import { relations } from 'drizzle-orm'
import { int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'

export const articles = mysqlTable('articles', {
  id: int('id').primaryKey().autoincrement(),
  headerText: varchar('headerText', { length: 60 }),
  content: text('content'),
  // writers: int('writer_id'),
  // editors: int('e'),
  // translaters: int('writer_id')
})

