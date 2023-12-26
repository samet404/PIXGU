import { createCuid2 } from '@/db/utils/createCuid2'
import { relations } from 'drizzle-orm'
import { mysqlTable, primaryKey, text, varchar } from 'drizzle-orm/mysql-core'
import { articlesToCategories } from './articlesToCategories'

export const articles = mysqlTable(
  'articles',
  {
    id: createCuid2(),
    headerText: varchar('headerText', { length: 191 }).notNull(),
    content: text('content').notNull(),
  },
  (articles) => {
    return {
      pk: primaryKey({ columns: [articles.id] }),
    }
  },
)

export const articlesRelations = relations(articles, ({ many }) => ({
  articlesToCategories: many(articlesToCategories),
}))
