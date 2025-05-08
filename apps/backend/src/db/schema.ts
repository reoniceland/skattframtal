import { sql } from 'drizzle-orm'
import {
  check,
  integer, numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
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

export const taxReturns = pgTable(
  'tax_returns',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    year: integer('year').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('draft'),
    submittedAt: timestamp('submitted_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserYear: uniqueIndex('users_year_idx').on(table.userId, table.year),
  }),
)

export const salaries = pgTable('salaries', {
  id: uuid('id').defaultRandom().primaryKey(),
  taxReturnId: uuid('tax_return_id').notNull().references(() => taxReturns.id, { onDelete: 'cascade' }),
  amount: integer('amount').notNull(),
  employerName: text('employer_name').notNull(),
  employerKennitala: text('employerKennitala').notNull(),
})
