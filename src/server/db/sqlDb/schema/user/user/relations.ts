import { relations } from 'drizzle-orm'
import { user } from '.'
import { blockedUser } from '../blockedUser'
import { userFriendship } from '../userFriendship'

export const userRelations = relations(user, ({ many }) => ({
  blockedBy: many(blockedUser, { relationName: 'blockedBy' }),
  blocked: many(blockedUser, { relationName: 'blocked' }),

  friend: many(userFriendship),
}))
