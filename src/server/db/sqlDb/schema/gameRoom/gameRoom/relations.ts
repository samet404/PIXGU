import { relations } from 'drizzle-orm'
import { gameRoom } from '.'
import { usersToGameRoom } from '@/schema/user/usersToGameRoom'
import { user } from '../..'

export const gameRoomRelations = relations(gameRoom, ({ many }) => ({
  players: many(usersToGameRoom),

  admins: many(user, { relationName: 'roomAdmin' }),
}))
