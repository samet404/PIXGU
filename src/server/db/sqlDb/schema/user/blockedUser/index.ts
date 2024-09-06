import { createCuid2 } from '@/db/sqlDb/utils'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { user } from '../user'
import { relations } from 'drizzle-orm'

export const blockedUser = pgTable('blocked_user', {
  ID: createCuid2(),
  blockedByID: varchar('blocked_by_ID', { length: 128 }).references(
    () => user.id,
  ),
  blockedID: varchar('blocked_ID', { length: 128 }).references(() => user.id),
})

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
