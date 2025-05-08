import { Module } from '@nestjs/common'
import { BackendService } from './backend.service'
import { UserModule } from './user/user.module'
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg'
import * as schema from './db/schema'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { AuthModule } from './auth/auth.module'
import { TaxReturnModule } from './tax-return/tax-return.module'
import { SalaryModule } from './salary/salary.module'
import { GrantModule } from './grant/grant.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzlePGModule.register({
      tag: 'DB_DEV',
      pg: {
        connection: 'client',
        config: {
          connectionString: process.env.DATABASE_URL!,
        },
      },
      config: {
        schema: { ...schema },
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      include: [HealthModule, TaxReturnModule],
    }),
    UserModule,
    HealthModule,
    AuthModule,
    TaxReturnModule,
    SalaryModule,
    GrantModule,
  ],
  controllers: [],
  providers: [BackendService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BackendModule {}
