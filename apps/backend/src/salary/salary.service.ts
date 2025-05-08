import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { salaries } from '../db/schema'
import { Salary } from './salary.model'
import { and, eq } from 'drizzle-orm'
import { CreateSalaryDto } from './dto/create-salary.dto'
import { UpdateSalaryDto } from './dto/update-salary.dto'
import { TaxReturnService } from '../tax-return/tax-return.service'
import { isPostgresError } from '../common/utils/db-error.util'

@Injectable()
export class SalaryService {
  constructor(
    @Inject('DB_DEV') private readonly db: NodePgDatabase<typeof schema>,
    private readonly taxReturnService: TaxReturnService,
  ) {}

  async findAllForNewestTaxReturn(userId: string): Promise<Salary[]> {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    return this.db
      .select()
      .from(salaries)
      .where(eq(salaries.taxReturnId, latestReturn.id))
  }

  /**
   * Create a salary under the newest tax return of a user.
   * @throws NotFoundException if the user has no tax returns.
   */
  async addToNewestTaxReturn(userId: string, dto: CreateSalaryDto) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    try {
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
    } catch (error: unknown) {
      if (
        isPostgresError(error) &&
        error.code === '23505' &&
        error.constraint === 'employer_tax_return_idx'
      ) {
        throw new ConflictException(
          `A salary for employer ${dto.employerName} (${dto.employerKennitala}) already exists on the latest tax return.`,
        )
      }
      throw error
    }
  }

  async updateForNewestTaxReturn(
    userId: string,
    salaryId: string,
    dto: UpdateSalaryDto,
  ) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    const found = await this.db
      .select()
      .from(salaries)
      .where(
        and(
          eq(salaries.id, salaryId),
          eq(salaries.taxReturnId, latestReturn.id),
        ),
      )
      .limit(1)

    if (!found.length) {
      throw new NotFoundException(
        `Salary ${salaryId} not found on newest tax return`,
      )
    }

    const [updated] = await this.db
      .update(salaries)
      .set({
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.employerName !== undefined && {
          employerName: dto.employerName,
        }),
        ...(dto.employerKennitala !== undefined && {
          employerKennitala: dto.employerKennitala,
        }),
      })
      .where(eq(salaries.id, salaryId))
      .returning()

    return updated
  }

  /**
   * Delete a salary under the user's newest tax return.
   * Throws 404 if no tax returns or salary not found.
   */
  async deleteForNewestTaxReturn(userId: string, salaryId: string) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    const { rowCount } = await this.db
      .delete(salaries)
      .where(
        and(
          eq(salaries.id, salaryId),
          eq(salaries.taxReturnId, latestReturn.id),
        ),
      )
    if (rowCount === 0) {
      throw new NotFoundException(
        `Salary ${salaryId} not found on newest tax return`,
      )
    }
  }
}
