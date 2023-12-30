import { createCuid2 } from '../utils/createCuid2'
import { relations } from 'drizzle-orm'
import { mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { articlesToArticleCategories } from './articlesToArticleCategories'

export const articles = mysqlTable('articles', {
  id: createCuid2(),
  headerText: varchar('headerText', { length: 191 }).notNull(),
  content: text('content').notNull(),
})

export const articlesRelations = relations(articles, ({ many }) => ({
  articlesToCategories: many(articlesToArticleCategories),
}))


