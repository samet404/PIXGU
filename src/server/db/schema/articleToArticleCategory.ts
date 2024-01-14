import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'
import { article } from './article'
import { articleCategory } from './articleCategory'

export const articleToArticleCategory = mysqlTable(
  'article_to_article_category',
  {
    articleId: varchar('articleId', { length: 128 }).notNull(),
    categoryId: varchar('categoryId', { length: 128 }).notNull(),
  },
)

export const articleToArticleCategoryRelations = relations(
  articleToArticleCategory,
  ({ one }) => ({
    article: one(article, {
      fields: [articleToArticleCategory.articleId],
      references: [article.id],
    }),

    category: one(articleCategory, {
      fields: [articleToArticleCategory.categoryId],
      references: [articleCategory.id],
    }),
  }),
)
