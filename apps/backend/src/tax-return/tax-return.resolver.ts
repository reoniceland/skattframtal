import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaxReturn } from './tax-return.model'
import { TaxReturnService } from './tax-return.service'
import { UpdateTaxReturnInput } from './dto/update-tax-return.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql-auth.guard'

@Resolver(() => TaxReturn)
export class TaxReturnResolver {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => TaxReturn, { name: 'currentTaxReturn' })
  async getCurrentTaxReturn(@Context() ctx: any): Promise<TaxReturn> {
    const userId = ctx.req.user.id
    return this.taxReturnService.getOrCreateLastYear(userId)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [TaxReturn], { name: 'taxReturns' })
  async getTaxReturns(
    @Args('userId', { type: () => String, nullable: true }) userId?: string,
  ): Promise<TaxReturn[]> {
    return this.taxReturnService.findAll(userId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TaxReturn, { name: 'updateTaxReturn' })
  async updateTaxReturn(
    @Args('input') input: UpdateTaxReturnInput,
    @Context() ctx: any,
  ): Promise<TaxReturn> {
    const actorId = ctx.req.user.id
    return this.taxReturnService.update(input.id, input, actorId)
  }
}
