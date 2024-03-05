import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { user } from '../..'
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'

export const userFriendship = pgTable('user_friendship', {
  ID: varchar('ID', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  userID: varchar('user_ID', { length: 128 })
    .references(() => user.id)
    .notNull(),
  friendID: varchar('friend_ID', { length: 128 })
    .references(() => user.id)
    .notNull(),
  friendUsernameWithUsernameID: varchar('friend_username_with_username_ID', {
    length: 70,
  })
    .references(() => user.usernameWithUsernameID)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const userFriendshipRelations = relations(userFriendship, ({ one }) => ({
  friend: one(user, {
    fields: [userFriendship.userID],
    references: [user.id],
  }),
}))
