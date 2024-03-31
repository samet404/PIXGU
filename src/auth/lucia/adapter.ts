import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from '@/sqlDb'
import { session, user } from '@/schema/user'

export const adapter = new DrizzlePostgreSQLAdapter(db, session, user)
