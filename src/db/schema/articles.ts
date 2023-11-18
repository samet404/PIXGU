import { int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { user } from './user'

export const article = mysqlTable('table', {
  id: int('id').autoincrement().primaryKey(),
  headerText: varchar('headerText', { length: 60 }),
  content: text('content'),
  writers: int('writer_id').references(() => user.id),
  editors: int('e').references(() => user.id),
  translaters: int('writer_id').references(() => user.id)
})
/*
model Article {
  id         String                @id @default(cuid())
  categories CategoriesOnArticle[]
  headerText String
  content    String
  writtenBy  User?                 @relation(fields: [userId], references: [id])
  userId     String?

  @@index([userId])
}

*/
