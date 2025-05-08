import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateTaxReturnInput {
  /**
   * The unique identifier of the tax return to update
   */
  @Field(() => String)
  id: string

  /**
   * The fiscal year of the tax return
   */
  @Field(() => Int, { nullable: true })
  year?: number

  /**
   * Status of the return (e.g., "draft", "submitted")
   */
  @Field(() => String, { nullable: true })
  status?: string

  /**
   * When the return was submitted
   */
  @Field(() => GraphQLISODateTime, { nullable: true })
  submittedAt?: Date
}
