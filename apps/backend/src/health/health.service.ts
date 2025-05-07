import { Inject, Injectable } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'

@Injectable()
export class HealthService {
  constructor(
    @Inject('DB_DEV') private readonly db: ReturnType<typeof drizzle>,
  ) {}

  async check(): Promise<void> {
    await this.db.execute(`SELECT 1`)
  }
}
