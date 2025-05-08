import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateSalaryInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  employerName?: string;

  @Field({ nullable: true })
  employerKennitala?: string;
}