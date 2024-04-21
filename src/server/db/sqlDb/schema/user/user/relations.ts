import { relations } from 'drizzle-orm'
import { user } from '.'
import { blockedUser } from '../blockedUser'
import { userFriendship } from '../userFriendship'
import { chat } from '@/schema/chat'
import { usersToGameRoom } from '../usersToGameRoom'

export const userRelations = relations(user, ({ many }) => ({
  blockedBy: many(blockedUser, { relationName: 'blockedBy' }),
  blocked: many(blockedUser, { relationName: 'blocked' }),

  playingRoom: many(usersToGameRoom),

  friend: many(userFriendship),

  chat: many(chat),
}))
