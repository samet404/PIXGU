import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const sessions = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})
