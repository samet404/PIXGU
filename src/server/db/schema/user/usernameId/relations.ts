import { relations } from 'drizzle-orm'
import { usernameId } from '.'
import { user } from '../user'

export const usernameIdRelations = relations(usernameId, ({ one }) => ({
  user: one(user, {
    fields: [usernameId.userId],
    references: [user.id],
  }),
}))
