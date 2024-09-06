import {
  pgTable,
  varchar,
  char,
  timestamp,
  text,
  bigint,
} from 'drizzle-orm/pg-core'
import { blockedUser } from '../blockedUser'
import { relations } from 'drizzle-orm'
import { userFriendship } from '../userFriendship'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: varchar('username', {
    length: 65,
  }).notNull(),
  usernameID: char('username_ID', { length: 4 }).unique().notNull(),
  usernameWithUsernameID: varchar('username_with_username_ID', {
    length: 70,
  })
    .unique()
    .notNull(),
  profilePicture: varchar('profile_picture', { length: 255 }),

  githubId: bigint('github_id', { mode: 'number' }).unique(),
  discordId: varchar('discord_id').unique(),
  googleId: varchar('google_id').unique(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  // playingRoomScoreID: varchar('playing_room_score_ID', { length: 128 }),
})

export const userRelations = relations(user, ({ many }) => ({
  blockedBy: many(blockedUser, { relationName: 'blockedBy' }),
  blocked: many(blockedUser, { relationName: 'blocked' }),

  friend: many(userFriendship),
}))
