import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({
    description: 'User kennitala (Icelandic national ID)',
    example: '1234567890',
  })
  @IsString()
  kennitala: string
}
