// https://lucia-auth.com/guidebook/drizzle-orm/#mysql
// https://lucia-auth.com/guidebook/drizzle-orm/#planetscaledatabase

import { sql } from 'drizzle-orm'
import {
  mysqlTable,
  bigint,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core'

export const user = mysqlTable('auth_user', {
  id: varchar('id', {
    length: 15, // change this when using custom user ids
  }).primaryKey(),

  // other user attributes

  username: varchar('username', {
    length: 64,
  }).notNull(),
  profilePicture: varchar('profile_picture', { length: 255 }),
  createdAt: timestamp('updated_at'),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  gender: varchar('gender', { length: 50 }),
  isAdmin: boolean('is_admin').default(false),
  // isBanned                       Boolean                  @default(false)
  // playingRoom                    Room?                    @relation(fields: [playingRoomId], references: [id])
  // playingRoomId                  String?                  @unique
  // writtenArticles                Article[]                @relation("WrittenArticles")
  // editedArticles                 Article[]                @relation("EditedArticles")
  // translatedArticles             Article[]                @relation("TranslatedArticles")
  // UserStatistic                  UserStatistic[]
  // writtenCutsceneTextInputGroups cutsceneTextInputGroup[]
  // UserAchivement                 UserAchivement[]
})

export const key = mysqlTable('user_key', {
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

export const session = mysqlTable('user_session', {
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
