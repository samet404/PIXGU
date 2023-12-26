import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { articles } from './articles'
import { articleCategories } from './articleCategories'

export const articlesToCategories = mysqlTable('articlesToCategories', {
  articleId: varchar('articleId', { length: 128 }).notNull(),
  categoryId: varchar('categoryId', { length: 128 }).notNull(),
})

export const articlesToCategoriesRelations = relations(
  articlesToCategories,
  ({ one }) => ({
    article: one(articles, {
      fields: [articlesToCategories.articleId],
      references: [articles.id],
    }),

    category: one(articleCategories, {
      fields: [articlesToCategories.categoryId],
      references: [articleCategories.id],
    }),
  }),
)
