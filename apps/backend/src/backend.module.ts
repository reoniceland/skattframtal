import { Module } from '@nestjs/common'
import { BackendController } from './backend.controller'
import { BackendService } from './backend.service'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
