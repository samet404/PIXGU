import { relations } from 'drizzle-orm'
import { gameRoom } from '../../gameRoom/gameRoom'
import { user } from '.'
import { blockedUser } from '../blockedUser'
import { userFriendship } from '../userFriendship'
import { chat } from '@/schema/chat'
import { usersToGameRoom } from '../usersToGameRoom'
// import { gameRoomPlayerScore } from '../../gameRoom/gameRoomPlayerScore'

export const userRelations = relations(user, ({ one, many }) => ({
  blockedBy: many(blockedUser, { relationName: 'blockedBy' }),
  blocked: many(blockedUser, { relationName: 'blocked' }),

  playingRoom: many(usersToGameRoom),
  adminRoom: one(gameRoom, {
    fields: [user.id],
    references: [gameRoom.],
    relationName: 'adminRoom',
  }),

  friend: many(userFriendship),

  chat: many(chat),

  // playingRoomScore: one(gameRoomPlayerScore),
}))
