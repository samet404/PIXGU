import { mysqlTable, tinyint, varchar } from 'drizzle-orm/mysql-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const gameRoomPlayerScore = mysqlTable('game_room_player_score', {
  id: createCuid2(),
  score: tinyint('score'),
  userId: varchar('id', { length: 128 }),
})