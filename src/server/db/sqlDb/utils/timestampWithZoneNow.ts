import { timestamp } from 'drizzle-orm/pg-core'

export const timestampWithZoneNow = (name?: string) => {
  if (!name) name = 'created_at'

  return timestamp(name, { precision: 6, withTimezone: true }).defaultNow()
}
