import { relations } from 'drizzle-orm'
import { gameRoomToUser } from '../gameRoomToUser'
import { user } from '../../user/user'
import { gameRoom } from '../gameRoom'

export const gameRoomRelations = relations(gameRoom, ({ many, one }) => ({
  players: many(gameRoomToUser),

  createdBy: one(user, {
    fields: [gameRoom.createdById],
    references: [user.id],
  }),
}))
