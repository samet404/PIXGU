import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const gameRoomToUser = pgTable('game_room_to_user', {
  userId: varchar('user_id', { length: 128 }),
  gameRoomId: varchar('user_id', { length: 128 }),
})