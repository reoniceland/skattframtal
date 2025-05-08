import { Test } from '@nestjs/testing'

import { UserService } from '../user/user.service'
import { AuthGuard } from './auth.guard'

describe('AuthGuard', () => {
  let guard: AuthGuard

  const userServiceMock = {
    findById: jest.fn().mockResolvedValue({ id: '123', email: 'demo@local' }),
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile()

    guard = moduleRef.get(AuthGuard)
  })

  it('should be defined', () => {
    expect(guard).toBeDefined()
  })
})
