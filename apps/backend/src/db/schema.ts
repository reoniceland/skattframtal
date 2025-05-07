import { sql } from 'drizzle-orm'
import { check, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid().defaultRandom().primaryKey(),
    kennitala: varchar('kennitala', { length: 10 }).notNull().unique(),
    full_name: text('full_name').notNull(),
    address: text('address').notNull(),
    email: text('email').notNull().unique(),
    phone_number: text('phone_number').notNull(),
  },
  (table) => [
    // Enforce exactly 10 digits on kennitala
    check(
      'kennitala_format',
      sql`${table.kennitala}
      ~ '^[0-9]{10}$'`,
    ),
  ],
)
