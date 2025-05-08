import { ApiProperty } from '@nestjs/swagger'

export class SalaryResponseDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string

  @ApiProperty({ example: '5b9e0f64-1234-4321-a2b3-9d8f7e6c5b4a' })
  taxReturnId: string

  @ApiProperty({ example: '45000.00' })
  amount: number

  @ApiProperty({ example: 'Acme Corp' })
  employerName: string

  @ApiProperty({ example: '1234567890' })
  employerKennitala: string
}
