import { Inject, Injectable } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import * as schema from '../db/schema'
import { User } from './user.model'
import { UserDto } from './user.dto'

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
  async findByKennitala(kennitala: string): Promise<User | undefined> {
    return this.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.kennitala, kennitala),
    })
  }

  /**
   * Find a user by their unique ID.
   * @param id - The user's ID
   * @throws NotFoundException if no user is found
   */
  async findById(id: string): Promise<UserDto | undefined> {
    return this.db.query.users.findFirst({
      columns: {
        id: true,
        kennitala: true,
        fullName: true,
        address: true,
        email: true,
        phoneNumber: true,
      },
      where: (user, { eq }) => eq(user.id, id),
    })
  }
}
