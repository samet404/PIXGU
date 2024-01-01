import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createCuid2 } from '../utils/createCuid2'
import { relations } from 'drizzle-orm'
import { articleToArticleCategory } from './articleToArticleCategory'

export const articleCategory = mysqlTable('article_category', {
  id: createCuid2().primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
})

export const articleCategoriesRelations = relations(
  articleCategory,
  ({ many }) => ({
    articleToCategory: many(articleToArticleCategory),
  }),
)
