import type { DatabaseError } from 'pg'

export function isPostgresError(err: unknown): err is DatabaseError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof (err as any).code === 'string' &&
    'constraint' in err &&
    typeof (err as any).constraint === 'string'
  )
}
