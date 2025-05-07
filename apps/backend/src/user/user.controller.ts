import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { UserDto } from './user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by their unique ID' })
  @ApiParam({ name: 'id', type: String, description: 'The user ID' })
  @ApiOkResponse({ description: 'The user details', type: UserDto })
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findById(id)
    if (!user) {
      throw new NotFoundException(`User not found`)
    }
    return user
  }
}
