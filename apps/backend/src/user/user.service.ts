import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('DB_DEV') private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  /**
   * Finds a user by their kennitala
   * @param kennitala - exactly 10-digit string
   * @returns the User, or undefined if not found
   */
  async findByKennitala(kennitala: string): Promise<UserDto | undefined> {
    return this.db.query.users.findFirst({
      columns: {
        kennitala: true,
        full_name: true,
        address: true,
        email: true,
        phone_number: true,
      },
      where: (user, { eq }) => eq(user.kennitala, kennitala),
    })
  }
}
