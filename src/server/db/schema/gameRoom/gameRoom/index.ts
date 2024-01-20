import { mysqlTable, tinyint, varchar } from 'drizzle-orm/mysql-core'
import { createCuid2 } from '../../../utils/createCuid2'

export const gameRoom = mysqlTable('game_room', {
  id: createCuid2().primaryKey(),
  name: varchar('name', { length: 255 }),
  maxPlayers: tinyint('max_players'),
  minPlayers: tinyint('min_players'),
  password: varchar('password', { length: 255 }),
  createdById: varchar('created_by_id', { length: 128 }),
})
