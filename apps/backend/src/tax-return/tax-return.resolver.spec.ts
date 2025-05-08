import { Test, TestingModule } from '@nestjs/testing'

import { TaxReturnResolver } from './tax-return.resolver'

describe('TaxReturnResolver', () => {
  let resolver: TaxReturnResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxReturnResolver],
    }).compile()

    resolver = module.get<TaxReturnResolver>(TaxReturnResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
