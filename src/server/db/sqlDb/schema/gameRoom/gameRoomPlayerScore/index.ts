import { pgTable, smallint, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const gameRoomPlayerScore = pgTable('game_room_player_score', {
  ID: createCuid2(),
  score: smallint('score'),
  userID: varchar('user_ID', { length: 128 }),
})