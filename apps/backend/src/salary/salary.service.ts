import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { salaries, taxReturns } from '../db/schema'
import { Salary } from './salary.model'
import { desc, eq } from 'drizzle-orm'
import { CreateSalaryDto } from './dto/create-salary.dto'

@Injectable()
export class SalaryService {
  constructor(
    @Inject('DB_DEV') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAllForUser(userId: string): Promise<Salary[]> {
    return this.db
      .select({
        id: salaries.id,
        taxReturnId: salaries.taxReturnId,
        amount: salaries.amount,
        employerName: salaries.employerName,
        employerKennitala: salaries.employerKennitala,
      })
      .from(salaries)
      .innerJoin(taxReturns, eq(salaries.taxReturnId, taxReturns.id))
      .where(eq(taxReturns.userId, userId))
  }

  /**
   * Create a salary under the newest tax return of a user.
   * @throws NotFoundException if the user has no tax returns.
   */
  async addToNewestTaxReturn(userId: string, dto: CreateSalaryDto) {
    const [latestReturn] = await this.db
      .select()
      .from(taxReturns)
      .where(eq(taxReturns.userId, userId))
      .orderBy(desc(taxReturns.year))
      .limit(1)

    if (!latestReturn) {
      throw new NotFoundException(`No tax return found for user ${userId}`)
    }

    const [newSalary] = await this.db
      .insert(salaries)
      .values({
        taxReturnId: latestReturn.id,
        amount: dto.amount,
        employerName: dto.employerName,
        employerKennitala: dto.employerKennitala,
      })
      .returning()

    return newSalary
  }
}
