import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { articles } from './articles'
import { articleCategories } from './articleCategories'

export const articlesToArticleCategories = mysqlTable(
  'articles_to_article_categories',
  {
    articleId: varchar('articleId', { length: 128 }).notNull(),
    categoryId: varchar('categoryId', { length: 128 }).notNull(),
  },
)

export const articlesToCategoriesRelations = relations(
  articlesToArticleCategories,
  ({ one }) => ({
    article: one(articles, {
      fields: [articlesToArticleCategories.articleId],
      references: [articles.id],
    }),

    category: one(articleCategories, {
      fields: [articlesToArticleCategories.categoryId],
      references: [articleCategories.id],
    }),
  }),
)
