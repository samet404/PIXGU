import { pgTable, smallint, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'
import { relations } from 'drizzle-orm'
import { usersToGameRoom } from '@/schema/user/usersToGameRoom'

export const gameRoom = pgTable('game_room', {
  ID: createCuid2(),
  name: varchar('name', { length: 255 }).notNull(),
  maxPlayers: smallint('max_players'),
  minPlayers: smallint('min_players'),
  password: varchar('password', { length: 128 }),
  createdAt: timestamp('created_at').notNull(),
})

export const gameRoomRelations = relations(gameRoom, ({ many }) => ({
  players: many(usersToGameRoom),
  admins: many(usersToGameRoom),
}))
