import { Test, TestingModule } from '@nestjs/testing'
import { configFolderPath, InjectionTokens } from 'src/constants'
import { ConfigService } from './config.service'
import { ConfigOptions } from './interface'

describe('ConfigService', () => {
  let service: ConfigService

  beforeEach(async () => {
    const configOptions: ConfigOptions = { folderPath: configFolderPath }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: InjectionTokens.CONFIG_OPTIONS, useValue: configOptions },
        ConfigService,
      ],
    }).compile()

    service = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be db url', () => {
    expect(service.get('DATABASE_URL')).toBe(
      'postgresql://postgres:123456@localhost:5432/nest-boilerplate',
    )
  })
})
