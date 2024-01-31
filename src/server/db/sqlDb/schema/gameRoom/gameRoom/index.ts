import { pgTable, smallint, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const gameRoom = pgTable('game_room', {
  id: createCuid2().primaryKey(),
  name: varchar('name', { length: 255 }),
  maxPlayers: smallint('max_players'),
  minPlayers: smallint('min_players'),
  password: varchar('password', { length: 255 }),
  createdById: varchar('created_by_id', { length: 128 }),
})
