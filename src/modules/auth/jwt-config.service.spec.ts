import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '../config/config.module'
import { JwtConfigService } from './jwt-config.service'

describe('JwtConfigService', () => {
  let service: JwtConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.register()],
      providers: [JwtConfigService],
    }).compile()

    service = module.get<JwtConfigService>(JwtConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createJwtOptions', () => {
    it('should return jwt options', () => {
      expect(service.createJwtOptions()).toEqual({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '7d',
        },
      })
    })
  })
})
