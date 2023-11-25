import { char, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: int('id').autoincrement(),
  nickname: char('nickname'),
  email: varchar('email', { length: 254 }),
})
