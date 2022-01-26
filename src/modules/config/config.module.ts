import { DynamicModule, Module } from '@nestjs/common'
import { InjectionTokens } from 'src/constants'
import { ConfigService } from './config.service'
import { ConfigOptions } from './interface'

@Module({
  providers: [ConfigService],
})
export class ConfigModule {
  static register(options?: Partial<ConfigOptions>): DynamicModule {
    const defaultConfigModuleOptions = {
      folderPath: `${process.cwd()}/config`,
      loadEnvFile: true,
    }

    return {
      module: ConfigModule,
      providers: [
        {
          provide: InjectionTokens.CONFIG_OPTIONS,
          useValue: Object.assign(defaultConfigModuleOptions, options),
        },
        ConfigService,
      ],
      exports: [ConfigService],
    }
  }
}
