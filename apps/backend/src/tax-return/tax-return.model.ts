import { Field, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TaxReturn {
  /** The unique identifier of the tax return */
  @Field(() => ID)
  id: string

  /** The ID of the user who owns this return */
  @Field(() => ID)
  userId: string

  /** The fiscal year of the return */
  @Field(() => Int)
  year: number

  /** Current status (draft, submitted, etc.) */
  @Field(() => String)
  status: string

  /** When the return was submitted */
  @Field(() => GraphQLISODateTime, { nullable: true })
  submittedAt: Date | null

  /** When the return record was created */
  @Field(() => GraphQLISODateTime)
  createdAt: Date

  /** When the return record was last updated */
  @Field(() => GraphQLISODateTime)
  updatedAt: Date
}
