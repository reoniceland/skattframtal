import { Test, TestingModule } from '@nestjs/testing'

import { TaxReturnService } from './tax-return.service'

describe('TaxReturnService', () => {
  let service: TaxReturnService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxReturnService],
    }).compile()

    service = module.get<TaxReturnService>(TaxReturnService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
