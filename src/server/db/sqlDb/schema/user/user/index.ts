import { pgTable, varchar, char, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: varchar('id', {
    length: 15, // change this when using custom user ids
  }).primaryKey(),
  username: varchar('username', {
    length: 65,
  }).notNull(),
  usernameID: char('username_ID', { length: 4 }).unique().notNull(),
  usernameWithUsernameID: varchar('username_with_username_ID', {
    length: 70,
  })
    .unique()
    .notNull(),
  profilePicture: varchar('profile_picture', { length: 255 }),
  playingRoomID: varchar('playing_room_ID', { length: 128 }),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  // playingRoomScoreID: varchar('playing_room_score_ID', { length: 128 }),
})
