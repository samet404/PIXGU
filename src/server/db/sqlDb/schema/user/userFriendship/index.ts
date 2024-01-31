import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { user } from '../..'
import { createCuid2 } from '@/sqlDb/utils/createCuid2'
import { timestampWithZoneNow } from '@/sqlDb/utils'

export const userFriendship = pgTable('user_friendship', {
  id: createCuid2(),
  friendID: varchar('friend_ID', { length: 128 }).references(() => user.id),
  createdDate: timestampWithZoneNow(),
})