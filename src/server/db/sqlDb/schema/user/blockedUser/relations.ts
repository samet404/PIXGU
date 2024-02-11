import { relations } from 'drizzle-orm'
import { blockedUser } from '.'
import { user } from '../..'

export const blockedUserRelations = relations(blockedUser, ({ one }) => ({
  blockedBy: one(user, {
    fields: [blockedUser.blockedByID],
    references: [user.id],
    relationName: 'blockedBy',
  }),

  blocked: one(user, {
    fields: [blockedUser.blockedID],
    references: [user.id],
    relationName: 'blocked',
  }),
}))
