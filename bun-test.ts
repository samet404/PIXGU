import { db } from '@/db/sqlDb'
import { user } from '@/schema/user'

const data = await db.select().from(user)
console.log(data)
