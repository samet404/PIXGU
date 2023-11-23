import { relations } from 'drizzle-orm'
import { int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { users } from './user'
// import { user } from './user'

export const articles = mysqlTable('articles', {
  id: int('id').autoincrement().primaryKey(),
  headerText: varchar('headerText', { length: 60 }),
  content: text('content'),
  writers: int('writer_id'),
  editors: int('e'),
  translaters: int('writer_id')
})

export const articleRelations = relations(articles, ({ one }) => ({
  writers: one(users, {
    fields: [articles.authorId],
    re
  })
}))


export const articleWriters = mysqlTable('articleWriters', {}) 