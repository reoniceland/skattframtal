import { Module } from '@nestjs/common'
import { TaxReturnService } from './tax-return.service'
import { TaxReturnController } from './tax-return.controller';
import {UserService} from "../user/user.service";

@Module({
  providers: [TaxReturnService, UserService],
  controllers: [TaxReturnController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TaxReturnModule {}
