import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { TaxReturnService } from './tax-return.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'


@ApiTags('tax-returns')
@ApiBearerAuth()
@Controller('tax-returns')
@UseGuards(AuthGuard)
export class TaxReturnController {
  constructor(private readonly taxReturnService: TaxReturnService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current current tax return' })
  getCurrent(@Req() req) {
    return this.taxReturnService.getOrCreateLastYear(req.user.id)
  }

}
