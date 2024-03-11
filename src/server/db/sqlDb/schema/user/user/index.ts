import { pgTable, varchar, char, timestamp, boolean } from 'drizzle-orm/pg-core'
import { gameRoom } from '../..'

export const user = pgTable('user', {
  id: varchar('id', {
    length: 15,
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

  playingRoomID: varchar('playing_room_ID', { length: 128 }).references(
    () => gameRoom.ID,
  ),

  isAdminInPlayingRoom: char('is_admin_in_playing_room', {
    length: 1,
  }),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
    
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  // playingRoomScoreID: varchar('playing_room_score_ID', { length: 128 }),
})
