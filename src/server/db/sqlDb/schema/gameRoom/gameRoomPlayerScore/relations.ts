import { relations } from 'drizzle-orm'
import { gameRoomPlayerScore } from '.'
import { user } from '../../user/user'

export const gameRoomPlayerScoreRelations = relations(
  gameRoomPlayerScore,
  ({ one }) => ({
    user: one(user, {
      fields: [gameRoomPlayerScore.userId],
      references: [user.id],
    }),
  }),
)