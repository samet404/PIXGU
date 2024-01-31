import { relations } from 'drizzle-orm'
import { articleCategory } from '.'
import { articleToArticleCategory } from '../articleToArticleCategory'

export const articleCategoriesRelations = relations(
  articleCategory,
  ({ many }) => ({
    articleToCategory: many(articleToArticleCategory),
  }),
)