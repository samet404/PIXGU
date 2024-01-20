// https://lucia-auth.com/guidebook/drizzle-orm/#mysql
// https://lucia-auth.com/guidebook/drizzle-orm/#planetscaledatabase

import {
  mysqlTable,
  bigint,
  varchar,
} from 'drizzle-orm/mysql-core'

export const userKey = mysqlTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  hashedPassword: varchar('hashed_password', {
    length: 255,
  }),
})

export const userSession = mysqlTable('user_session', {
  id: varchar('id', {
    length: 128,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  activeExpires: bigint('active_expires', {
    mode: 'number',
  }).notNull(),
  idleExpires: bigint('idle_expires', {
    mode: 'number',
  }).notNull(),
})
