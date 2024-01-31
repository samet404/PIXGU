import { relations } from 'drizzle-orm'
import { gameRoom } from '../../gameRoom/gameRoom'
import { user } from '.'
import { userFriendship } from '..'
// import { gameRoomPlayerScore } from '../../gameRoom/gameRoomPlayerScore'

export const userRelations = relations(user, ({ one, many }) => ({
  playingRoom: one(gameRoom, {
    fields: [user.playingRoomId],
    references: [gameRoom.id],
  }),

  friends: many(userFriendship),
  // playingRoomScore: one(gameRoomPlayerScore),
}))
