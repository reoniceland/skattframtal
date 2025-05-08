import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

import { salaries } from '../db/schema'

export type Salary = InferSelectModel<typeof salaries>
export type NewSalary = InferInsertModel<typeof salaries>
