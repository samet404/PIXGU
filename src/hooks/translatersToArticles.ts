import { relations } from 'drizzle-orm'
import { int, mysqlTable, primaryKey } from 'drizzle-orm/mysql-core'
import { users } from './user'
import { articles } from './articles'

export const translatersToArticles = mysqlTable(
  'translatersToArticles',
  {
    id: int('id').autoincrement(),
    translaterId: int('writer_id').autoincrement(),
    articleId: int('article_id').autoincrement(),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: 'translatersToArticlesPrimaryKeys',
        columns: [table.id, table.translaterId, table.articleId],
      }),
    }
  },
)

export const translatersToArticlesRelations = relations(
  translatersToArticles,
  ({ one }) => ({
    writer: one(users, {
      fields: [translatersToArticles.translaterId],
      references: [users.id],
    }),

    article: one(articles, {
      fields: [translatersToArticles.articleId],
      references: [articles.id],
    }),
  }),
)
