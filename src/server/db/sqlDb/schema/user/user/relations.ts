import { relations } from 'drizzle-orm'
import { gameRoom } from '../../gameRoom/gameRoom'
import { user } from '.'
import { blockedUser } from '../blockedUser'
import { userFriendship } from '../userFriendship'
// import { gameRoomPlayerScore } from '../../gameRoom/gameRoomPlayerScore'

export const userRelations = relations(user, ({ one, many }) => ({
  blockedBy: many(blockedUser, { relationName: 'blockedBy' }),
  blocked: many(blockedUser, { relationName: 'blocked' }),
 
  playingRoom: one(gameRoom, {
    fields: [user.playingRoomID],
    references: [gameRoom.ID],
  }),

  friends: many(userFriendship),
  // playingRoomScore: one(gameRoomPlayerScore),
}))
