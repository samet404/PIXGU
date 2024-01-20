import { relations } from 'drizzle-orm'
import { article } from '../article'
import { articleCategory } from '../articleCategory'
import { articleToArticleCategory } from '.'

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