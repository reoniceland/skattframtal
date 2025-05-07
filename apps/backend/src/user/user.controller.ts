import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { UserDto } from './user.dto'
import { AuthGuard } from '../auth/auth.guard'

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the current authenticated user' })
  @ApiOkResponse({ description: 'The current user details', type: UserDto })
  getProfile(@Req() req): UserDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (req).user as UserDto
  }
}
