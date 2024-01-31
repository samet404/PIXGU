import { relations } from 'drizzle-orm'
import { userFriendship } from '.'
import { user } from '../..'

export const userFriendshipRelations = relations(userFriendship, ({ one }) => ({
  friend: one(user, {
    fields: [userFriendship.friendID],
    references: [user.id],
  }),
}))
