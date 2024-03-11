import { relations } from 'drizzle-orm'
import { user } from '../../user/user'
import { gameRoom } from '.'

export const gameRoomRelations = relations(gameRoom, ({ many }) => ({
  players: many(user, { relationName: 'playingRoom' }),
}))
