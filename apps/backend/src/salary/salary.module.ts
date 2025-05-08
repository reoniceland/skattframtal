import { Module } from '@nestjs/common'
import { SalaryService } from './salary.service'
import { SalaryController } from './salary.controller'
import { UserService } from '../user/user.service'

@Module({
  providers: [SalaryService, UserService],
  controllers: [SalaryController],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SalaryModule {}
