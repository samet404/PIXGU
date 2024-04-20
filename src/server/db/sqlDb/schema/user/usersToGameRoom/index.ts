import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { user } from '@/schema/user/user'
import { relations } from 'drizzle-orm'
import { gameRoom } from '@/schema/gameRoom'

export const usersToGameRoom = pgTable(
  'users_to_game_room',
  {
    userID: varchar('user_ID', { length: 128 }).references(() => user.id),
    gameRoomID: varchar('game_room_ID', { length: 128 }).references(
      () => gameRoom.ID,
    ),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userID, t.gameRoomID] }),
  }),
)

export const usersToGameRoomRelations = relations(
  usersToGameRoom,
  ({ one }) => ({
    user: one(user, {
      fields: [usersToGameRoom.userID],
      references: [user.id],
    }),

    gameRoom: one(gameRoom, {
      fields: [usersToGameRoom.gameRoomID],
      references: [gameRoom.ID],
    }),
  }),
)
