import { relations } from 'drizzle-orm'
import { int, mysqlTable, primaryKey } from 'drizzle-orm/mysql-core'
import { users } from './user'
import { articles } from './articles'

export const editorsToArticles = mysqlTable(
  'translatersToArticles',
  {
    id: int('id').autoincrement(),
    editorId: int('writer_id').autoincrement(),
    articleId: int('editor_id').autoincrement(),
  },
  (table) => {
    return {
      pk: primaryKey({
        name: 'translatersToArticlesPrimaryKeys',
        columns: [table.id, table.editorId, table.articleId],
      }),
    }
  },
)

export const editorsToArticlesRelations = relations(
  editorsToArticles,
  ({ one }) => ({
    writer: one(users, {
      fields: [editorsToArticles.editorId],
      references: [users.id],
    }),

    article: one(articles, {
      fields: [editorsToArticles.articleId],
      references: [articles.id],
    }),
  }),
)
