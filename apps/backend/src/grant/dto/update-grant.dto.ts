import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator'
import { grantTypesEnum } from '../../db/schema'
import { GrantType } from '../grant.types'

export class UpdateGrantDto {
  @ApiPropertyOptional({
    enum: grantTypesEnum.enumValues,
    description: 'Grant type as defined in the schema enum',
  })
  @IsOptional()
  @IsEnum(grantTypesEnum.enumValues)
  type?: GrantType

  @ApiPropertyOptional({
    example: 120000,
    description: 'Grant amount as an integer (no cents)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  amount?: number

  @ApiPropertyOptional({
    example: 'Ministry of Education',
    description: 'Provider name (optional)',
  })
  @IsOptional()
  @IsString()
  providerName?: string

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'Provider kennitala (10 digits)',
  })
  @IsOptional()
  @IsString()
  providerKennitala?: string

  @ApiPropertyOptional({
    example: 'Updated notes about the grant',
    description: 'Optional free-form notes',
  })
  @IsOptional()
  @IsString()
  notes?: string
}
