import { relations } from 'drizzle-orm'
import { article } from '.'
import { articleToArticleCategory } from '../articleToArticleCategory'

export const articlesRelations = relations(article, ({ many }) => ({
  articleToCategories: many(articleToArticleCategory),
}))
