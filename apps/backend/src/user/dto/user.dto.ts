import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: '1234567890', description: 'Kennitala' })
  kennitala!: string

  @ApiProperty({ example: 'Jóna Jónsdóttir' })
  full_name!: string

  @ApiProperty({ example: 'Laugavegur 1, Reykjavík' })
  address!: string

  @ApiProperty({ example: 'jona@example.com' })
  email!: string

  @ApiProperty({ example: '+354-123-4567' })
  phone_number!: string
}
