import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateSalaryInput {
  @Field(() => Int)
  amount: number

  @Field()
  employerName: string

  @Field()
  employerKennitala: string
}
