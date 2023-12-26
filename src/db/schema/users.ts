import { createCuid2 } from '@/db/utils/createCuid2'
import {
  timestamp,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('user', {
  id: createCuid2(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
})
