import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { taxReturns } from '../db/schema'
import { and, eq } from 'drizzle-orm'

@Injectable()
export class TaxReturnsService {
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
}
