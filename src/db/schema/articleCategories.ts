import { mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { createCuid2 } from '@/db/utils/createCuid2'
import { relations } from 'drizzle-orm'
import { articlesToCategories } from './articlesToCategories'

export const articleCategories = mysqlTable(
  'articleCategories',
  {
    id: createCuid2(),
    name: varchar('name', { length: 50 }).notNull(),
  },
  (ac) => {
    return {
      pk: primaryKey({
        columns: [ac.id],
      }),
    }
  },
)

export const articleCategoriesRelations = relations(
  articleCategories,
  ({ many }) => ({
    articlesToCategories: many(articlesToCategories),
  }),
)
