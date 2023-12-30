import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createCuid2 } from '../utils/createCuid2'
import { relations } from 'drizzle-orm'
import { articlesToArticleCategories } from './articlesToArticleCategories'

export const articleCategories = mysqlTable('article_categories', {
  id: createCuid2(),
  name: varchar('name', { length: 50 }).notNull(),
})

export const articleCategoriesRelations = relations(
  articleCategories,
  ({ many }) => ({
    articlesToCategories: many(articlesToArticleCategories),
  }),
)
