import { pgTable, smallint, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const gameRoomPlayerScore = pgTable('game_room_player_score', {
  id: createCuid2(),
  score: smallint('score'),
  userId: varchar('id', { length: 128 }),
})