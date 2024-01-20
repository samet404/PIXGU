import { relations } from 'drizzle-orm'
import { gameRoomToUser } from '.'
import { user } from '../../user/user'
import { gameRoom } from '../gameRoom'

export const gameRoomToUserRelations = relations(gameRoomToUser, ({ one }) => ({
  user: one(user, {
    fields: [gameRoomToUser.userId],
    references: [user.id],
  }),

  gameRoom: one(gameRoom, {
    fields: [gameRoomToUser.gameRoomId],
    references: [gameRoom.id],
  }),
}))