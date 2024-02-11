import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const gameRoomToUser = pgTable('game_room_to_user', {
  userID: varchar('user_ID', { length: 128 }),
  gameRoomID: varchar('game_room_ID', { length: 128 }),
})