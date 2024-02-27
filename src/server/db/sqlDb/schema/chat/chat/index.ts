import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { createCuid2 } from '../../../utils/createCuid2'
import { user } from '@/schema/user'
import { relations } from 'drizzle-orm'

export const chat = pgTable('chat', {
  ID: createCuid2(),
  fromID: varchar('from_ID', { length: 128 })
    .notNull()
    .references(() => user.id),

  toFriendID: varchar('to_friend_ID', { length: 128 })
    .notNull()
    .references(() => user.id),

  text: varchar('text', { length: 500 }).notNull(),
  time: varchar('time', { length: 30 }).notNull(),
})

export const chatRelations = relations(chat, ({ one }) => ({
  user: one(user, {
    fields: [chat.fromID],
    references: [user.id],
  }),
}))
