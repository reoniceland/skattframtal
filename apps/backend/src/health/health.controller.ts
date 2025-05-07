import { Controller, Get, HttpCode } from '@nestjs/common'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  @HttpCode(200)
  async check() {
    await this.health.check()
    return { status: 'ok' }
  }
}
