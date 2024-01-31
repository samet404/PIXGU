// https://lucia-auth.com/guidebook/drizzle-orm/#postgress

import { pgTable, bigint, varchar } from 'drizzle-orm/pg-core'

export const userKey = pgTable('user_key', {
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

export const userSession = pgTable('user_session', {
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
