import { gameRoom } from '../../gameRoom/gameRoom'
import { relations } from 'drizzle-orm'
import { int, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { gameRoomPlayerScore } from '../../gameRoom/gameRoomPlayerScore'

export const user = mysqlTable(
  'auth_user',
  {
    id: varchar('id', {
      length: 15,
    }),
    username: varchar('username', {
      length: 64,
    }).notNull(),
    usernameId: int('username_id').unique().notNull(),
    profilePicture: varchar('profile_picture', { length: 255 }),
    playingRoomId: varchar('playing_room_id', { length: 128 }),
    playingRoomScoreId: varchar('playing_room_score_id', { length: 128 }),
  },
  (user) => {
    return {
      pk: primaryKey({ columns: [user.id] }),
    }
  },
)