import { int, mysqlTable } from 'drizzle-orm/mysql-core';

export const friends = mysqlTable('friends', {
    id: int('id').primaryKey().autoincrement(),
    
})