import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSalaryDto {
  @ApiProperty({
    example: 45000,
    description: 'Salary amount as an integer (no cents)',
  })
  @IsInt()
  @Min(0)
  amount: number

  @ApiProperty({ example: 'Acme Corp', description: 'Employer name' })
  @IsString()
  @IsNotEmpty()
  employerName: string

  @ApiProperty({
    example: '1234567890',
    description: 'Employer kennitala (10 digits)',
  })
  @IsString()
  @IsNotEmpty()
  employerKennitala: string
}
