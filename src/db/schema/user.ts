import { char, int, json, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

// type friendsData = {
//     friends: Array<string>
// }

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    nickname: char('nickname'),
    email: varchar('email', { length: 254 }),
    // friends: json('friends').$type<friendsData>()
})