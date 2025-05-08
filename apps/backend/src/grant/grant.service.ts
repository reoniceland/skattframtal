import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { grants } from '../db/schema'
import { and, eq } from 'drizzle-orm'
import { CreateGrantDto } from './dto/create-grant.dto'
import { UpdateGrantDto } from './dto/update-grant.dto'
import { TaxReturnService } from '../tax-return/tax-return.service'
import { isPostgresError } from '../common/utils/db-error.util'

@Injectable()
export class GrantService {
  constructor(
    @Inject('DB_DEV')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
    private readonly taxReturnService: TaxReturnService,
  ) {}

  /** Fetch all grants for a given user */
  async findAllForUser(userId: string) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    return this.db
      .select()
      .from(grants)
      .where(eq(grants.taxReturnId, latestReturn.id))
  }

  /** Add a grant to the user's newest tax-return */
  async addToNewestTaxReturn(userId: string, dto: CreateGrantDto) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    try {
      const [newGrant] = await this.db
        .insert(grants)
        .values({
          taxReturnId: latestReturn.id,
          type: dto.type,
          amount: dto.amount,
          providerName: dto.providerName,
          providerKennitala: dto.providerKennitala,
          notes: dto.notes,
        })
        .returning()

      return newGrant
    } catch (error: unknown) {
      if (
        isPostgresError(error) &&
        error.code === '23505' &&
        error.constraint === 'provider_tax_return_idx'
      ) {
        throw new ConflictException(
          `A grant from provider ${dto.providerName} (${dto.providerKennitala}) already exists on the latest tax return.`,
        )
      }
      throw error
    }
  }

  /** Update a grant on the user's newest tax-return */
  async updateForNewestTaxReturn(
    userId: string,
    grantId: string,
    dto: UpdateGrantDto,
  ) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    const exists = await this.db
      .select()
      .from(grants)
      .where(
        and(eq(grants.id, grantId), eq(grants.taxReturnId, latestReturn.id)),
      )
      .limit(1)

    if (!exists.length) {
      throw new NotFoundException(
        `Grant ${grantId} not found on latest tax return`,
      )
    }

    const [updated] = await this.db
      .update(grants)
      .set({
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.providerName !== undefined && {
          providerName: dto.providerName,
        }),
        ...(dto.providerKennitala !== undefined && {
          providerKennitala: dto.providerKennitala,
        }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      })
      .where(eq(grants.id, grantId))
      .returning()

    return updated
  }

  /** Delete a grant from the user's newest tax-return */
  async deleteForNewestTaxReturn(userId: string, grantId: string) {
    const latestReturn = await this.taxReturnService.getOrCreateLastYear(userId)

    const { rowCount } = await this.db
      .delete(grants)
      .where(
        and(eq(grants.id, grantId), eq(grants.taxReturnId, latestReturn.id)),
      )

    if (rowCount === 0) {
      throw new NotFoundException(
        `Grant ${grantId} not found on latest tax return`,
      )
    }
  }
}
