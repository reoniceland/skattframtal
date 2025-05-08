import { Module } from '@nestjs/common'
import { TaxReturnsService } from './tax-returns.service'

@Module({
  providers: [TaxReturnsService],
})
export class TaxReturnsModule {}
