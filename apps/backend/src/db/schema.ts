import { sql } from 'drizzle-orm'
import {
  check,
  integer,
  pgEnum,
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
  (table) => [uniqueIndex('users_year_idx').on(table.userId, table.year)],
)

export const salaries = pgTable(
  'salaries',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    taxReturnId: uuid('tax_return_id')
      .notNull()
      .references(() => taxReturns.id, { onDelete: 'cascade' }),
    amount: integer('amount').notNull(),
    employerName: text('employer_name').notNull(),
    employerKennitala: varchar('employer_kennitala', { length: 10 }).notNull(),
  },
  (table) => [
    uniqueIndex('employer_tax_return_idx').on(
      table.taxReturnId,
      table.employerKennitala,
    ),
    // Enforce exactly 10 digits on kennitala
    check(
      'kennitala_format',
      sql`${table.employerKennitala}
      ~ '^[0-9]{10}$'`,
    ),
  ],
)

// prettier-ignore
export const grantTypesEnum = pgEnum('grant_type_enum', [
  'SURVIVOR_BENEFITS',                // Dánarbætur
  'OLD_AGE_PENSION',                  // Ellilífeyrir
  'REHABILITATION_PENSION',           // Endurhæfingarlífeyrir
  'PARENTAL_BENEFITS',                // Foreldragreiðslur (fjárhagsaðstoð/grunngreiðslur)
  'HOUSING_SUPPLEMENT',               // Heimilisuppbót
  'SPOUSAL_AND_CARE_ALLOWANCES',      // Maka- og umönnunarbætur
  'MATERNITY_PATERNITY_PAY',          // Mæðra- og feðralaun
  'HOLIDAY_DECEMBER_SUPPLEMENT',      // Orlofs- og desemberuppbætur
  'DISPOSABLE_FUNDS',                 // Ráðstöfunarfé
  'INCOME_GUARANTEE',                 // Tekjutrygging
  'COST_OF_LIVING_ADJUSTMENT',        // Uppbætur á lífeyri vegna kostnaðar
  'DISABILITY_PENSION',               // Örorkulífeyrir
  'DISABILITY_GRANT',                 // Örorkustyrkur
  'ACCIDENT_DISABILITY_PENSION',      // Örorkulífeyrir vegna slysa
  'PRIVATE_PENSION_PAYMENT',          // Lífeyrisgreiðslur úr séreignarsjóðum
  'UNEMPLOYMENT_BENEFITS',            // Atvinnuleysisbætur
  'MUNICIPAL_GRANTS',                 // Styrkir og bætur frá sveitarfélögum
  'EDUCATION_RESEARCH_GRANT',         // Styrkir til náms, rannsóknar- og vísindastarfa
])
// prettier-ignore-end

export const grants = pgTable(
  'grants',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    taxReturnId: uuid('tax_return_id')
      .notNull()
      .references(() => taxReturns.id, { onDelete: 'cascade' }),
    type: grantTypesEnum('type').notNull(),
    amount: integer('amount').notNull(),
    providerName: varchar('provider_name', { length: 200 }),
    providerKennitala: varchar('provider_kennitala', { length: 10 }).notNull(),
    notes: text('notes'),
  },
  (table) => [
    uniqueIndex('provider_tax_return_idx').on(
      table.taxReturnId,
      table.providerKennitala,
    ),
    // Enforce exactly 10 digits on kennitala
    check(
      'kennitala_format',
      sql`${table.providerKennitala}
      ~ '^[0-9]{10}$'`,
    ),
  ],
)
