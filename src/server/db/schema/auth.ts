// https://lucia-auth.com/guidebook/drizzle-orm/#mysql
// https://lucia-auth.com/guidebook/drizzle-orm/#planetscaledatabase

import {
  mysqlTable,
  bigint,
  varchar,
  primaryKey,
  int,
} from 'drizzle-orm/mysql-core'

export const user = mysqlTable(
  'auth_user',
  {
    id: varchar('id', {
      length: 15, // change this when using custom user ids
    }),

    // other user attributes
    usernameId: int('username_id').autoincrement().unique().notNull(),
    username: varchar('username', {
      length: 64,
    }).notNull(),

    profilePicture: varchar('profile_picture', { length: 255 }),
  },
  (user) => {
    return {
      pk: primaryKey({ columns: [user.id] }),
    }
  },
)

export const key = mysqlTable('user_key', {
  id: varchar('id', {
    length: 255,
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 15,
  }).notNull(),
  // hashedPassword: varchar('hashed_password', {
  //   length: 255,
  // }),
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
