import { DynamicModule, Module } from '@nestjs/common'
import { InjectionTokens } from 'src/constants'
import { ConfigService } from './config.service'
import { ConfigOptions } from './interface'

@Module({
  providers: [ConfigService],
})
export class ConfigModule {
  static register(options?: ConfigOptions): DynamicModule {
    const defaultOptions: ConfigOptions = {
      folderPath: `${process.cwd()}/config`,
      loadEnvFile: true,
      isGlobal: true,
    }

    return {
      global: options?.isGlobal || defaultOptions.isGlobal,
      module: ConfigModule,
      providers: [
        {
          provide: InjectionTokens.CONFIG_OPTIONS,
          useValue: { ...defaultOptions, options },
        },
        ConfigService,
      ],
      exports: [ConfigService],
    }
  }
}
