import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const articleToArticleCategory = pgTable('article_to_article_category', {
  articleId: varchar('articleId', { length: 128 }).notNull(),
  categoryId: varchar('categoryId', { length: 128 }).notNull(),
})
