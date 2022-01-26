import { Test, TestingModule } from '@nestjs/testing'
import { InjectionTokens } from 'src/constants'
import { ConfigService } from './config.service'
import { ConfigOptions } from './interface'

describe('ConfigService', () => {
  const genConfigService = async (options: Partial<ConfigOptions>) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: InjectionTokens.CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
    }).compile()

    return module.get<ConfigService>(ConfigService)
  }

  it('should not load env files', async () => {
    const configService = await genConfigService({ loadEnvFile: false })

    expect(configService.get('TEST' as any)).toBeUndefined()
    expect(configService.get('DATABASE_URL')).toBeUndefined()
    expect(configService.get('DATABASE_URL')).toBe(process.env.DATABASE_URL)
  })

  it('should load env files', async () => {
    const configService = await genConfigService({
      loadEnvFile: true,
      folderPath: `${process.cwd()}/config`,
    })

    expect(configService.get('TEST' as any)).toBeUndefined()
    expect(configService.get('DATABASE_URL')).toBeString()
    expect(configService.get('DATABASE_URL')).toBe(process.env.DATABASE_URL)
  })
})
