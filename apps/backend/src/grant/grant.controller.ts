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
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/auth.guard'
import { GrantService } from './grant.service'
import { UpdateGrantDto } from './dto/update-grant.dto'
import { GrantResponseDto } from './dto/grant-response.dto'
import { CreateGrantDto } from './dto/create-grant.dto'
import { grantTypesEnum } from '../db/schema'

@ApiTags('grants')
@ApiBearerAuth()
@Controller('grants')
@UseGuards(AuthGuard)
export class GrantController {
  constructor(private readonly grantService: GrantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all grants for the authenticated user' })
  @ApiOkResponse({
    description: 'List of grants',
    type: GrantResponseDto,
    isArray: true,
  })
  getAll(@Req() req) {
    return this.grantService.findAllForUser(req.user.id)
  }

  @Get('types')
  @ApiOperation({ summary: 'Get all possible grant types' })
  @ApiOkResponse({
    description: 'Array of grant type strings',
    schema: {
      type: 'array',
      items: { type: 'string', enum: grantTypesEnum.enumValues },
    },
  })
  getTypes() {
    // Return the enum values from the schema
    return grantTypesEnum.enumValues as string[]
  }

  @Post()
  @ApiOperation({
    summary: "Add a grant to the user's newest tax return",
  })
  @ApiBody({ type: CreateGrantDto })
  @ApiCreatedResponse({
    description: 'Grant created successfully',
    type: GrantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No tax return found for the user',
  })
  @ApiResponse({
    status: 409,
    description:
      'A grant from that provider already exists on the latest tax return',
  })
  create(
    @Req() req,
    @Body('amount', ParseIntPipe) amount: number,
    @Body() dto: Omit<CreateGrantDto, 'amount'>,
  ) {
    return this.grantService.addToNewestTaxReturn(req.user.id, {
      amount,
      ...dto,
    })
  }

  @Patch(':grantId')
  @ApiOperation({
    summary: "Update a grant on the user's newest tax return",
  })
  @ApiParam({
    name: 'grantId',
    description: 'UUID of the grant to update',
    type: 'string',
    format: 'uuid',
  })
  @ApiBody({ type: UpdateGrantDto })
  @ApiOkResponse({
    description: 'Grant updated successfully',
    type: GrantResponseDto,
  })
  @ApiResponse({
    status: 404,
    description:
      'No tax return found or grant not found on the latest tax return',
  })
  update(
    @Req() req,
    @Param('grantId', ParseUUIDPipe) grantId: string,
    @Body() dto: UpdateGrantDto,
  ) {
    return this.grantService.updateForNewestTaxReturn(req.user.id, grantId, dto)
  }

  @Delete(':grantId')
  @ApiOperation({
    summary: "Delete a grant from the user's newest tax return",
  })
  @ApiParam({
    name: 'grantId',
    description: 'UUID of the grant to delete',
    type: 'string',
    format: 'uuid',
  })
  @ApiNoContentResponse({
    description: 'Grant deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description:
      'No tax return found or grant not found on the latest tax return',
  })
  delete(@Req() req, @Param('grantId', ParseUUIDPipe) grantId: string) {
    return this.grantService.deleteForNewestTaxReturn(req.user.id, grantId)
  }
}
