import { createId } from '@paralleldrive/cuid2'
import { varchar } from 'drizzle-orm/pg-core'

export const createCuid2 = (name?: string) => {
  if (!name) name = 'id'

  return varchar(name, { length: 128 }).$defaultFn(() => createId())
}
