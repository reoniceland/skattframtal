import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import { SalaryService } from './salary.service'
import { Salary } from './salary.model'
import { CreateSalaryDto } from './dto/create-salary.dto'
import { SalaryResponseDto } from './dto/salary-response.dto'

@ApiTags('salaries')
@ApiBearerAuth()
@Controller('salaries')
@UseGuards(AuthGuard)
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all salaries for user' })
  @ApiOkResponse({ description: 'The users salaries' })
  getSalaries(@Req() req): Promise<Salary[]> {
    return this.salaryService.findAllForUser(req.user.id)
  }

  @Post()
  @ApiOperation({
    summary: "Add a salary to the user's newest tax return",
    description:
      'Automatically finds the latest tax-return for the user and attaches this salary to it.',
  })
  @ApiBody({ type: CreateSalaryDto })
  @ApiResponse({
    status: 201,
    description: 'The salary record was created successfully.',
    type: SalaryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No tax return found for the given user ID.',
  })
  async create(
    @Req() req,
    @Body('amount', ParseIntPipe) amount: number,
    @Body() dto: Omit<CreateSalaryDto, 'amount'>,
  ) {
    return this.salaryService.addToNewestTaxReturn(req.user.id, {
      amount,
      ...dto,
    })
  }
}
