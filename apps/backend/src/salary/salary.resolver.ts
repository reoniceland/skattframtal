import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { SalaryService } from './salary.service'
import { Salary } from './salary.model'
import { CreateSalaryInput } from './dto/create-salary.input'
import { UpdateSalaryInput } from './dto/update-salary.input'

@Resolver()
export class SalaryResolver {
  constructor(private readonly salaryService: SalaryService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Salary], { name: 'salaries' })
  async getSalaries(@Context() ctx: any): Promise<Salary[]> {
    const userId = ctx.req.user.id
    return this.salaryService.findAllForNewestTaxReturn(userId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Salary, { name: 'addSalary' })
  async addSalary(
    @Context() ctx: any,
    @Args('input') input: CreateSalaryInput,
  ): Promise<Salary> {
    const userId = ctx.req.user.id
    return this.salaryService.addToNewestTaxReturn(userId, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Salary, { name: 'updateSalary' })
  async updateSalary(
    @Context() ctx: any,
    @Args('input') input: UpdateSalaryInput,
  ): Promise<Salary> {
    const userId = ctx.req.user.id
    return this.salaryService.updateForNewestTaxReturn(userId, input.id, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteSalary' })
  async deleteSalary(
    @Context() ctx: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    const userId = ctx.req.user.id
    await this.salaryService.deleteForNewestTaxReturn(userId, id)
    return true
  }
}
