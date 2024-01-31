import { pgTable, primaryKey, varchar, char } from 'drizzle-orm/pg-core'
import { gameRoom } from '../..'
import { timestampWithZoneNow } from '@/sqlDb/utils'

export const user = pgTable(
  'user',
  {
    id: varchar('id', {
      length: 15,
    }),
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
    playingRoomId: varchar('playing_room_id', { length: 128 }).references(
      () => gameRoom.id,
    ),
    createdDate: timestampWithZoneNow(),

    // playingRoomScoreId: varchar('playing_room_score_id', { length: 128 }),
  },
  (user) => {
    return {
      pk: primaryKey({ columns: [user.id] }),
    }
  },
)
