import { mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const gameRoomToUser = mysqlTable('game_room_to_user', {
  userId: varchar('user_id', { length: 128 }),
  gameRoomId: varchar('user_id', { length: 128 }),
})