import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class UpdateSalaryDto {
  @ApiPropertyOptional({
    example: 55000,
    description: 'New salary amount (integer, no cents)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  amount?: number

  @ApiPropertyOptional({
    example: 'Globex Corporation',
    description: 'New employer name',
  })
  @IsOptional()
  @IsString()
  employerName?: string

  @ApiPropertyOptional({
    example: '0987654321',
    description: 'New employer kennitala (10 digits)',
  })
  @IsOptional()
  @IsString()
  employerKennitala?: string
}
