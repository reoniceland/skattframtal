import { ApiProperty } from '@nestjs/swagger'
import { grantTypesEnum } from '../../db/schema'
import { GrantTypeResp } from '../grant.types'

export class GrantResponseDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string

  @ApiProperty({ example: '5b9e0f64-1234-4321-a2b3-9d8f7e6c5b4a' })
  taxReturnId: string

  @ApiProperty({ enum: grantTypesEnum.enumValues })
  type: GrantTypeResp

  @ApiProperty({ example: 100000 })
  amount: number

  @ApiProperty({ example: 'Ministry of Finance', required: false })
  providerName?: string

  @ApiProperty({ example: '1234567890' })
  providerKennitala: string

  @ApiProperty({ example: 'Additional notes', required: false })
  notes?: string
}
