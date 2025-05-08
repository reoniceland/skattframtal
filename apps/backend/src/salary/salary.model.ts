import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Salary {
  /** Unique identifier for the salary record */
  @Field(() => ID)
  id: string

  /** The tax-return ID this salary belongs to */
  @Field(() => ID)
  taxReturnId: string

  /** Salary amount in whole currency units */
  @Field(() => Int)
  amount: number

  /** Employer’s name */
  @Field()
  employerName: string

  /** Employer’s kennitala (10-digit national ID) */
  @Field()
  employerKennitala: string
}
