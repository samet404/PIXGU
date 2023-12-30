import { createId } from '@paralleldrive/cuid2'
import { varchar } from 'drizzle-orm/mysql-core'

export const createCuid2 = () =>
  varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .notNull()
