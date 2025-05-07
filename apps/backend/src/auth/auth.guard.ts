import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    // eslint-disable-next-line @typescript-eslint/dot-notation,@typescript-eslint/no-unsafe-assignment
    const token = request.headers['authorization']
    if (!token) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const user = await this.userService.findById(token)
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    ;(request as any).user = user
    return true
  }
}
