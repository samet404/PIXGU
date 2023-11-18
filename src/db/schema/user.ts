import { char, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
    id: int('id').primaryKey().autoincrement(),
    nickname: char('nickname'),
    email: varchar('email', { length: 254 })
})