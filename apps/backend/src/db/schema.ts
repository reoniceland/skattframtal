import { sql } from 'drizzle-orm'
import {
  check,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: uuid().defaultRandom().primaryKey(),
    kennitala: varchar('kennitala', { length: 10 }).notNull().unique(),
    fullName: text('full_name').notNull(),
    address: text('address').notNull(),
    email: text('email').notNull().unique(),
    phoneNumber: text('phone_number').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
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
