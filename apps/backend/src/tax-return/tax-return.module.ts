import { Module } from '@nestjs/common'
import { TaxReturnService } from './tax-return.service'

@Module({
  providers: [TaxReturnService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TaxReturnModule {}
