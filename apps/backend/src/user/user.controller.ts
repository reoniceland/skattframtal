import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserDto } from './dto/user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':kennitala')
  @ApiOperation({ summary: 'Get a user by kennitala' })
  @ApiParam({
    name: 'kennitala',
    description: '10-digit Icelandic ID (kennitala)',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'User found', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByKennitala(
    @Param('kennitala') kennitala: string,
  ): Promise<UserDto> {
    const user = await this.userService.findByKennitala(kennitala)
    if (!user) {
      throw new NotFoundException(`User with kennitala ${kennitala} not found`)
    }
    return user
  }
}
