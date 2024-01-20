import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const articleToArticleCategory = mysqlTable(
  'article_to_article_category',
  {
    articleId: varchar('articleId', { length: 128 }).notNull(),
    categoryId: varchar('categoryId', { length: 128 }).notNull(),
  },
)
