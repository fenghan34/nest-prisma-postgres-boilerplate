import { Test, TestingModule } from '@nestjs/testing'
import { UtilsService } from './utils.service'

describe('UtilsService', () => {
  let service: UtilsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile()

    service = module.get<UtilsService>(UtilsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('hash', () => {
    it('should return hash', async () => {
      const hash = await service.hash('asdf@131')
      expect(hash).toBeString()
    })
  })

  describe('compare', () => {
    const text = 'asdf@131'

    it('should return true', async () => {
      const hash = await service.hash(text)
      expect(await service.compare(text, hash)).toBeTrue()
    })

    it('should return false', async () => {
      const hash = await service.hash(text)
      expect(await service.compare('asdf', hash)).toBeFalse()
    })
  })
})
