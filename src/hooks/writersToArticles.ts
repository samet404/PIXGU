import { relations } from 'drizzle-orm'
import { int, mysqlTable, primaryKey } from 'drizzle-orm/mysql-core'
import { users } from './user'
import { articles } from './articles'

export const writersToArticles = mysqlTable(
  'writerToArticles',
  {
    id: int('id').autoincrement().primaryKey(),
    writerId: int('writer_id').autoincrement().primaryKey(),
    articleId: int('article_id').autoincrement().primaryKey(),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: 'translatersToArticlesPrimaryKeys',
        columns: [table.id, table.writerId, table.articleId],
      }),
    }
  },
)

export const writerToArticlesRelations = relations(
  writersToArticles,
  ({ one }) => ({
    writer: one(users, {
      fields: [writersToArticles.writerId],
      references: [users.id],
    }),

    article: one(articles, {
      fields: [writersToArticles.articleId],
      references: [articles.id],
    }),
  }),
)
