import { sql } from 'drizzle-orm'
import { check, pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    kennitala: varchar('kennitala', { length: 10 }).primaryKey(),
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
