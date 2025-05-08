import { Test, TestingModule } from '@nestjs/testing'

import { TaxReturnController } from './tax-return.controller'

describe('TaxReturnController', () => {
  let controller: TaxReturnController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxReturnController],
    }).compile()

    controller = module.get<TaxReturnController>(TaxReturnController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
