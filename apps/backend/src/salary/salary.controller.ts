import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import { SalaryService } from './salary.service'
import { Salary } from './salary.model'
import { CreateSalaryDto } from './dto/create-salary.dto'
import { SalaryResponseDto } from './dto/salary-response.dto'
import { UpdateSalaryDto } from './dto/update-salary.dto'
import { isUserDto, UserDto } from '../user/user.dto'

@ApiTags('salaries')
@ApiBearerAuth()
@Controller('salaries')
@UseGuards(AuthGuard)
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all salaries for users newest tax-return' })
  @ApiOkResponse({ description: 'The users salaries' })
  getSalaries(@Req() req): Promise<Salary[]> {
    return this.salaryService.findAllForNewestTaxReturn(req.user.id)
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

  @Patch(':salaryId')
  @ApiOperation({
    summary: "Update a salary on the user's newest tax return",
  })
  @ApiParam({
    name: 'salaryId',
    description: 'UUID of the salary to update',
    type: 'string',
    format: 'uuid',
  })
  @ApiBody({ type: UpdateSalaryDto })
  @ApiResponse({
    status: 200,
    description: 'The salary record was updated.',
    type: SalaryResponseDto,
  })
  @ApiResponse({
    status: 404,
    description:
      'No tax return found or salary not found on the newest tax return.',
  })
  update(
    @Req() req,
    @Param('salaryId', ParseUUIDPipe) salaryId: string,
    @Body() dto: UpdateSalaryDto,
  ) {
    return this.salaryService.updateForNewestTaxReturn(
      req.user.id,
      salaryId,
      dto,
    )
  }

  @Delete(':salaryId')
  @ApiOperation({
    summary: "Delete a salary from the user's newest tax return",
  })
  @ApiParam({
    name: 'salaryId',
    description: 'UUID of the salary to delete',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'The salary was deleted.',
  })
  @ApiResponse({
    status: 404,
    description:
      'No tax return found or salary not found on the newest tax return.',
  })
  delete(@Req() req, @Param('salaryId', ParseUUIDPipe) salaryId: string) {
    return this.salaryService.deleteForNewestTaxReturn(req.user.id, salaryId)
  }
}
