import { Module } from '@nestjs/common'
import { GrantService } from './grant.service'
import { GrantController } from './grant.controller'
import { TaxReturnService } from '../tax-return/tax-return.service'
import { UserService } from '../user/user.service'

@Module({
  providers: [GrantService, UserService, TaxReturnService],
  controllers: [GrantController],
})
export class GrantModule {}
