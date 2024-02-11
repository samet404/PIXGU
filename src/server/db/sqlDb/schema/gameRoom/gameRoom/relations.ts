import { relations } from 'drizzle-orm'
import { gameRoomToUser } from '../gameRoomToUser'
import { user } from '../../user/user'
import { gameRoom } from '.'

export const gameRoomRelations = relations(gameRoom, ({ many }) => ({
  players: many(gameRoomToUser),
}))