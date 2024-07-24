import {
  char,
  pgTable,
  smallint,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { usersToGameRoom } from '@/schema/user/usersToGameRoom'
import { init } from '@paralleldrive/cuid2'

const createId = init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 5,
})

export const gameRoom = pgTable('game_room', {
  ID: char('ID', { length: 5 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 128 }),
  createdAt: timestamp('created_at').notNull(),
})

export const gameRoomRelations = relations(gameRoom, ({ many }) => ({
  players: many(usersToGameRoom),
  admins: many(usersToGameRoom),
}))
