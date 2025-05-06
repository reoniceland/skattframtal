import { Module } from '@nestjs/common'
import { BackendController } from './backend.controller'
import { BackendService } from './backend.service'
import { UserModule } from './user/user.module'
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg'
import * as schema from './db/schema'
import { ConfigModule } from '@nestjs/config'

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
    UserModule,
  ],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
