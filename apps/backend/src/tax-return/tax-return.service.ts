import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { taxReturns } from '../db/schema'
import { and, eq } from 'drizzle-orm'
import { UpdateTaxReturnInput } from './dto/update-tax-return.input'

@Injectable()
export class TaxReturnService {
  constructor(
    @Inject('DB_DEV') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getOrCreateLastYear(userId: string) {
    const lastYear = new Date().getUTCFullYear() - 1

    const [existing] = await this.db
      .select()
      .from(taxReturns)
      .where(and(eq(taxReturns.userId, userId), eq(taxReturns.year, lastYear)))
      .limit(1)

    if (existing) {
      return existing
    }

    const [inserted] = await this.db
      .insert(taxReturns)
      .values({
        userId,
        year: lastYear,
      })
      .returning()

    return inserted
  }

  async findAll(userId?: string) {
    const query = this.db.select().from(taxReturns)
    if (userId) {
      query.where(eq(taxReturns.userId, userId))
    }
    return query
  }

  async update(id: string, input: UpdateTaxReturnInput, actorId: string) {
    const [existing] = await this.db
      .select()
      .from(taxReturns)
      .where(eq(taxReturns.id, id))
      .limit(1)

    if (!existing) {
      throw new NotFoundException(`TaxReturn with id ${id} not found`)
    }
    if (existing.userId !== actorId) {
      throw new ForbiddenException(
        `You do not have permission to update this tax return`,
      )
    }

    const { id: _omit, ...updateData } = input as any
    const [updated] = await this.db
      .update(taxReturns)
      .set(updateData)
      .where(eq(taxReturns.id, id))
      .returning()

    return updated
  }
}
