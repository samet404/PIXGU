import { relations } from 'drizzle-orm'
import { gameRoom } from '../../gameRoom/gameRoom'
import { user } from '.'
import { gameRoomPlayerScore } from '../../gameRoom/gameRoomPlayerScore'
import { usernameId } from '../usernameId'

export const userRelations = relations(user, ({ one }) => ({
  playingRoom: one(gameRoom, {
    fields: [user.playingRoomId],
    references: [gameRoom.id],
  }),

  playingRoomScore: one(gameRoomPlayerScore),

  usernameId: one(usernameId, {
    fields: [user.usernameId],
    references: [usernameId.id]
  })
}))
