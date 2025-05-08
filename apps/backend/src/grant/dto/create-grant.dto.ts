import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { grantTypesEnum } from '../../db/schema'
import { GrantType } from '../grant.types'

export class CreateGrantDto {
  @ApiProperty({
    enum: grantTypesEnum.enumValues,
    description: 'Grant type as defined in the schema enum',
  })
  @IsEnum(grantTypesEnum.enumValues)
  type: GrantType

  @ApiProperty({
    example: 100000,
    description: 'Grant amount as an integer (no cents)',
  })
  @IsInt()
  @Min(0)
  amount: number

  @ApiPropertyOptional({
    example: 'Ministry of Finance',
    description: 'Provider name (optional)',
  })
  @IsOptional()
  @IsString()
  providerName?: string

  @ApiProperty({
    example: '1234567890',
    description: 'Provider kennitala (10 digits)',
  })
  @IsString()
  @IsNotEmpty()
  providerKennitala: string

  @ApiPropertyOptional({
    example: 'Additional notes about the grant',
    description: 'Optional free-form notes',
  })
  @IsOptional()
  @IsString()
  notes?: string
}
