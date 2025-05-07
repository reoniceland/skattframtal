import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login({ kennitala }: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findByKennitala(kennitala)
    if (!user) {
      throw new UnauthorizedException('No user with that kennitala')
    }
    return { token: user.id }
  }
}
