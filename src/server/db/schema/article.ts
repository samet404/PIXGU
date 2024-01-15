import { createCuid2 } from '../utils/createCuid2'
import { relations } from 'drizzle-orm'
import { mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { articleToArticleCategory } from './articleToArticleCategory'

export const article = mysqlTable('article', {
  id: createCuid2().primaryKey(),
  headerText: varchar('headerText', { length: 191 }).notNull(),
  content: text('content').notNull(),
})

export const articlesRelations = relations(article, ({ many }) => ({
  articleToCategories: many(articleToArticleCategory),
}))