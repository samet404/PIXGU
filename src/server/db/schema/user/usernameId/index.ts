import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const usernameId = mysqlTable('username_id', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 128 }),
})
