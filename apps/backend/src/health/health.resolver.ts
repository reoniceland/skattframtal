import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class HealthResolver {
  @Query(() => String, { name: 'healthCheck' })
  health() {
    return 'OK'
  }
}
