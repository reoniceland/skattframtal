import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserService } from '../user/user.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    const authHeader =
      // eslint-disable-next-line @typescript-eslint/dot-notation,@typescript-eslint/no-unsafe-assignment
      req.headers['authorization'] || req.headers['Authorization']
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader

    const user = await this.userService.findById(
      token.replace(/^Bearer\s+/i, ''),
    )
    if (!user) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    req.user = user
    return true
  }
}
