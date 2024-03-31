import {
  pgTable,
  varchar,
  char,
  timestamp,
  text,
  bigint,
} from 'drizzle-orm/pg-core'
import { gameRoom } from '../..'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
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

  playingRoomID: varchar('playing_room_ID', { length: 128 }).references(
    () => gameRoom.ID,
  ),

  isAdminInPlayingRoom: char('is_admin_in_playing_room', {
    length: 1,
  }),

  githubId: bigint('github_id', { mode: 'number' }).unique(),
  discordId: varchar('discord_id').unique(),
  googleId: bigint('google_id', { mode: 'number' }).unique(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  // playingRoomScoreID: varchar('playing_room_score_ID', { length: 128 }),
})
